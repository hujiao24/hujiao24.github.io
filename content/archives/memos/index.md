---
categories:
- 默认分类
date: '2026-01-10 09:13:24+08:00'
description: ''
draft: false
image: ''
slug: memos
cover: /archives/memos/vzgvgj.png
tags:
- memos
- notion
title: 碎片笔记memos的部署和使用
---

## 前言

随着互联网的发展，各类笔记软件也一路迭代，但一直没能找到让人满意的一款笔记软件，直到遇见 notion，基于块的笔记结构可以随意拖动，既是如此丝滑

还有很多优秀的特性，着实让人眼前一亮就喜欢上了，如今 notion 的估计已达 100 亿；对比之下，印象有道之流就太落伍了，已经属于旧时代的产物了

紧接着 notion 就成为了主力笔记软件，但是 notion 用久了，还有不少的小问题，以及一些大问题

1、网络问题，最开始网络基本被隔绝的，最近几年网络改善了很多，但是不用代理的情况下偶尔还是会抽风

2、残影问题，不知道从哪一个版本开始，windows 下的版本频繁出现残影问题，多的时候一天能出现 10 来次以上，升级了多个版本至今一直都没有解决

3、笔记丢失问题，之前没发现过（可能也存在），最近出现一次比较严重的笔记丢失问题，`ctrl + s` 整个页面丢失一半以上，还好有历史的功能可以恢复

4、备受诟病的就是，不开源也不提供 markdown 格式（虽然也支持导出），数据安全以及迁移问题

然后，也在考虑 notion 的可替代方案，经了解还真有不少，其中开源的版本有 AFFiNE，似乎是一个值得考虑的方案

另外 notion 用久了，里面塞了大量的碎片笔记，memos 对碎片笔记的管理就非常方便，这里的 AFFiNE 和 memos 都是开源的，非开源的方案就不考虑了

## 版本编译

这里以 memos 为例，官方地址 `https://github.com/usememos/memos`，项目基于 go + node 开发，需要先准备好 go 的环境以及 node 的环境

下载代码后，首先构建 web 页面代码，切换到 web 目录下， `pnpm i` 安装依赖，然后 `pnpm release` 编译前端代码到 `server/router/frontend/dist` 目录下

![](/archives/memos/vzgvgj.png)

然后执行 `go build -o ./build/memos.exe ./cmd/memos` 生成编译执行文件

考虑到有些人可能需要 windows 版本，但是官方并没有提供 windows 版本，这里也将 windows 版本上传到 csdn 上

这里编译的版本基于 main 分支的 `commit da2dd80e2f4143`，有需要可以自取

`https://download.csdn.net/download/weixin_53109623/92550440`

## memos部署

支持 docker 和二进制部署，我这里是部署在 linux 下，以官方发布的 linux 版本为例，下载后直接运行就可以

默认使用 sqlite 存储，后续有需要再迁移其他存储，使用 `--data` 参数，指定存储的路径，存储数据库文件，以及图片和文件附件

从命令行参数就可以看到，整体部署非常简单，备份以及迁移直接将 data 目录保存就可以

![](/archives/memos/83twoa.png)

登录 web 页面后，在系统设置中将对象存储改为本地文件系统，默认是会将文件塞到数据库里面，数据库很快会炸掉

![](/archives/memos/abkl5g.png)

对 memos 添加部分记录测试显示如下，整体显示还比较满意，也发现一些小问题，不过问题不大并不影响正常使用

输入支持部分的 markdown 语法，还支持 html 的标签输入，比如设置标题 h1、粗体、img src 等这些，可以自行灵活调整页面的显示

但是有两点：输入框太小了一点，还有页面显示的每一个 content 宽度太小了，页面一半以上的空间都是空白的，看着实在有点难受

![](/archives/memos/jp75l1.png)

另外在 memos 的系统设置中，提供自定义 css 样式代码，经过对页面的简单分析，添加几行样式代码如下 

```css
.max-w-2xl
{
    max-width: var(--container-5xl);
}

textarea {
    height: 96px !important;
}

p {
    white-space: pre-line;
}

```

![](/archives/memos/xlr0k8.png)

添加自定义样式代码后，再刷新页面显示如下，整体上舒服很多

![](/archives/memos/dmke9h.png)



 