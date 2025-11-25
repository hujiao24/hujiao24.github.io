
---
categories:
- 默认分类
date: '2025-11-25 14:19:24+08:00'
description: ''
draft: false
image: ''
slug: fiddler-https
cover: /archives/fiddler-https/3mmbcm.png
tags:
title: 开启fiddler抓取https请求报文
---

fiddler 默认是没有配置抓取 https 请求包的，需要在 options 面板中的 HTTPS 标签页，勾选 “Capture HTTPS CONNECTs” 和 "Decrypt HTTPS traffic"

然后点击右侧的 Actions 按钮，选择 "Trust Root Certificates"，在弹出的窗口中点击确认就可以了

![](/archives/fiddler-https/3mmbcm.png)

也可以选择第二项 “Export Root Certificates to Desktop” 将证书导出到桌面，然后双击安装证书，和点击安装证书是一样的

证书添加完毕后，通过 `certlm.msc` 命令打开证书管理器，可以看到 fiddler 添加的证书 “DO_NOT_TRUST_FiddlerRoot”

 ![](/archives/fiddler-https/3cgw09.png)

这时候，chrome 浏览器输入 `https://www.baidu.com` 访问，就可以在 fiddler 中查看到抓取到的数据报文了

![](/archives/fiddler-https/edcwuw.png)

在浏览器中查看 baidu.com 的证书，可以看到证书的颁发者变成了 fiddler 的 “DO_NOT_TRUST_FiddlerRoot”

左侧是未开启 https 抓包时候的证书链情况，右侧为开启 https 抓包时候的证书链情况

![](/archives/fiddler-https/3p02vl.png)

对于一些自签的以及过期的网站证书，chrome 的地址栏会显示一个红色的不安全图标，fiddler 对这类站点进行抓包的时候，会弹出一个错误提示框如下

如果不希望弹出这个提示框，可以在 fiddler 中勾选 “Ignore server certificate errors”（ Tools -> Options -> Https 标签页中）

![](/archives/fiddler-https/xtxfd7.png)

点击请求记录，在 Inspectors 中的 TextView 或 SyntaxView 显示的是乱码，上方提示 “Response body is encoded. Click to decode.”，点击该提示可显示为明文

这是因为发送请求的时候，请求头中添加了 “Accept-Encoding: gzip, deflate, br, zstd”，服务端响应的时候，对数据进行了 gzip 压缩

![](/archives/fiddler-https/p64bph.png)

![](/archives/fiddler-https/l2an2u.png)