---
categories:
- 默认分类
date: '2026-01-11 11:38:24+08:00'
description: ''
draft: false
image: ''
slug: memos-trouble
cover: /archives/memos-trouble/yjunj7.png
tags:
- memos
title: 关于碎片笔记memos的使用吐槽几句
---

才刚初步评估 memos 觉得还不错，搭建完然后上手要投入使用了，结果发布第一条记录就嘎了，纳尼这么差劲的吗？部署的是 0.25.3 发布版本

```
ERROR: [core] [Server #1]grpc: server failed to encode response: rpc error: code = Internal desc = grpc: error while marshaling: string field 
contains invalid UTF-8
```

页面上提示失败了，但是数据库又写进去了？

![](/archives/memos-trouble/yjunj7.png)

刷新页面的时候，显示未找到任何数据？然后底下又显示有 10 条记录，其实数据库是有 11 条记录，最开始的一条 `hello world` 记录是正常的也没显示出来

![](/archives/memos-trouble/id8eum.png)

由于本地已经编译了 main 分支的版本，想着在 windows 上跑一下看是什么情况，结果在第一步注册管理员用户的时候，就直接崩溃了

虽然 main 分支和发布版本的代码有些变动，但是这也太疯狂了吧？代码完全没测试就直接 commit 了？好歹也 50k+ 星标的开源项目，还是这么随意的吗？

![](/archives/memos-trouble/q98t41.png)

![](/archives/memos-trouble/2kae6h.png)

查看项目 utf8 错误的问题，看到已经有人提交了 `https://github.com/usememos/memos/pull/5401`

但是这 pr 有严重问题，语法检查都过不了，怎么能在结构体中嵌入语句呢？似乎 pr 本意应该是在结构体前，结果这么随手一粘贴就提交 pr 了？

![](/archives/memos-trouble/xgalod.png)

网上对 memos 的评价比较差，API、页面大改非常随意

![](/archives/memos-trouble/592jo1.png)

## 修复补充

仔细分析了下 memos 项目的代码实现，发生 uft8 错误并不是因为换行的原因，只不过我在本地测试的时候多了个换行符导致长度变动了

实际问题是在 ListMemos 查询的时候进行 GenerateSnippet 处理，会对原始的 memo 记录进行了截取，在遇到中文的时候，这一截可能就出问题了

原始代码并不是按 rune 进行截取的，是按 byte 进行了处理，然后就导致问题产生，数据写进去了，但是查询出来截取了半个中文，然后就出问题了

修改代码如下，windows 编译的版本提交到了 `https://download.csdn.net/download/weixin_53109623/92555947`

```diff
diff --git a/plugin/markdown/markdown.go b/plugin/markdown/markdown.go
index c6498beb..6570bde4 100644
--- a/plugin/markdown/markdown.go
+++ b/plugin/markdown/markdown.go
@@ -3,6 +3,7 @@ package markdown
 import (
        "bytes"
        "strings"
+       "unicode/utf8"

        "github.com/yuin/goldmark"
        gast "github.com/yuin/goldmark/ast"
@@ -209,6 +210,7 @@ func (s *service) GenerateSnippet(content []byte, maxLength int) (string, error)

        var buf strings.Builder
        var lastNodeWasBlock bool
+       var runeCount int

        err = gast.Walk(root, func(n gast.Node, entering bool) (gast.WalkStatus, error) {
                if entering {
@@ -225,6 +227,7 @@ func (s *service) GenerateSnippet(content []byte, maxLength int) (string, error)
                        case gast.KindParagraph, gast.KindHeading, gast.KindListItem:
                                if buf.Len() > 0 && lastNodeWasBlock {
                                        buf.WriteByte(' ')
+                                       runeCount++
                                }
                        default:
                                // No space needed for other node types
@@ -246,18 +249,20 @@ func (s *service) GenerateSnippet(content []byte, maxLength int) (string, error)

                // Only extract plain text nodes
                if textNode, ok := n.(*gast.Text); ok {
-                       segment := textNode.Segment
-                       buf.Write(segment.Value(content))
+                       val := textNode.Segment.Value(content)
+                       buf.Write(val)
+                       runeCount += utf8.RuneCount(val)

                        // Add space if this is a soft line break
                        if textNode.SoftLineBreak() {
                                buf.WriteByte(' ')
+                               runeCount++
                        }
                }

                // Stop walking if we've exceeded double the max length
                // (we'll truncate precisely later)
-               if buf.Len() > maxLength*2 {
+               if runeCount > maxLength*2 {
                        return gast.WalkStop, nil
                }

@@ -271,8 +276,8 @@ func (s *service) GenerateSnippet(content []byte, maxLength int) (string, error)
        snippet := buf.String()

        // Truncate at word boundary if needed
-       if len(snippet) > maxLength {
-               snippet = truncateAtWord(snippet, maxLength)
+       if utf8.RuneCountInString(snippet) > maxLength {
+               snippet = truncateRunes(snippet, maxLength)
        }

        return strings.TrimSpace(snippet), nil
@@ -405,3 +410,19 @@ func truncateAtWord(s string, maxLength int) string {

        return truncated + " ..."
 }
+
+// truncateRunes truncates a string at a rune boundary before maxLength.
+func truncateRunes(s string, maxLength int) string {
+       // Rune-safe length check
+       if utf8.RuneCountInString(s) <= maxLength {
+               return s
+       }
+
+       // Convert to rune slice for safe truncation
+       rs := []rune(s)
+
+       // Hard truncate at rune length
+       truncated := string(rs[:maxLength])
+
+       return truncated + " ..."
+}
```

