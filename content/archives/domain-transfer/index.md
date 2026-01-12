---
categories:
- 默认分类
date: '2026-01-12 11:32:24+08:00'
description: ''
draft: false
image: ''
slug: domain-transfer
cover: /archives/domain-transfer/m6wfsp.png
tags:
- namesilo
- cloudflare
- 域名转移
title: 将namesilo上的域名快速迁移到cloudflare中
---

## 前言

域名是在 namesilo 购买的，并且也一直都是在 namesilo 中续费，但是 namesilo 有几个问题

1、界面太古老了，看起来总是有种不舒服的感觉

2、不提供中文显示，虽然可以三方翻译，但是麻烦还不一定准确，操作不便

3、费用问题，除了域名新注册有时候可能有优惠会便宜一点，续费价格一般都比 cloudflare 贵

比如，在 namesilo 上续费价格为 9.9 美元，但是 cloudflare 不加价、按注册局费用收取，不收额外利润或隐藏费，续费价格能便宜 2 美元

![](/archives/domain-transfer/dnyelg.png)

![](/archives/domain-transfer/aqa0os.png)

因此，考虑将域名迁移到 cloudflare 中，域名迁移是不会产生其他额外费用的，cloudflare 上显示的费用是域名一年的续费金额

在转移到 cloudflare 的时候进行收取，转移后你也可以关闭自动续费，然后在下一次域名到期后，自己进行手动续费

## 域名迁移

需要准备 cloudflare 的账户，并且要求绑定支付方式（visa信用卡或者 paypal 等其他支付方式，美元支付）

然后在左侧菜单中选择转移域，然后在域名列表中选择已有的域名（托管在 cloudflare 中的域名），或者通过搜索添加域名

![](/archives/domain-transfer/4uhut5.png)

然后下一步，要求输入一个授权码，这个授权码是在 namesilo 中获取的

![](/archives/domain-transfer/ibznb9.png)

登录 namesilo 中，在域名页面的下面，有一项 `Authorization Code`，点击右侧的 `Send Email` 发送授权码，另外还需要确认域名是处于 `UNLOCKED` 状态的

![](/archives/domain-transfer/2xtnff.png)

稍等一会，邮箱就会收到一封 namesilo 发来的邮件，将邮件中的授权码拷贝粘贴到 cloudflare 的输入框

并且在这里邮件也提示了，需要转移的域名得注册了 60 天以上，或者上一次转移已经超过了 60 天

![](/archives/domain-transfer/pdh3uv.png)

输入授权码后，点击继续付款进行到下一步，选择支付方式然后再下一步，就进入了等待状态，可以点击下方的 `查看转移状态`

![](/archives/domain-transfer/l91qtf.png)

根据状态显示，完成转移域名可能需要等待 7 天，太长了

![](/archives/domain-transfer/m6wfsp.png)

在 namesilo 的个人中心，点击左侧的 `Transfer Manager` 打开转移管理页面，下方显示处于 `Pendding` 状态的域名记录，点击记录右侧的 `APPROVE`

![](/archives/domain-transfer/rp6bg9.png)

![](/archives/domain-transfer/gcldp8.png)

然后在新的页面中点击 `SUBMIT`，提交转移域名处理，页面提示大概会在 15 分钟左右完成域名转移

![](/archives/domain-transfer/8zdfqo.png)

提交后稍等一会，其实不需要等待 15 分钟，实际也就一两分钟，域名就已经完成转移了，在 cloudflare 中查看域名显示为活动状态

![](/archives/domain-transfer/yo9cjw.png)