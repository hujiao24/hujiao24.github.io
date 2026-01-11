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

粗略看了下代码，也看不出来哪里的问题，测试了多次发现 utf8 错误是换行导致的，只好先使用 `<br>` 进行写入，先适应一段时间看能否投入使用吧