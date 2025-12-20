---
categories:
- 默认分类
date: '2025-12-14 16:19:24+08:00'
description: ''
draft: false
image: ''
slug: vmq-deploy
cover: /archives/vmq-deploy/r18lqd.png
tags:
- vmq
- 安卓开发
title: 基于vmq的支付系统部署
---

## 服务端部署

### 版本变动

和原版对比，进行了一些修改，修改后的服务端版本代码地址 `https://github.com/hujiao24/vmqphp`

#### 1、移除了金额冲突

考虑到业务量如果不是非常大，同一时间发生多个相同金额的订单概率极其小，更大的可能性是一个待支付客户先后点击了多次造成的冲突，从而生成了多个订单

这时候生成的金额需要客户手工输入递增/减以分为单位的金额，这个行为会让客户极其反感，从而增大订单流失的概率

极端情况下，不同客户并发订单冲突导致支付异常，这时候需要手工介入处理，如果用户要求退款的，个人觉得也是可以接受的，毕竟这种情况的发生概率比较低

如果你站点的业务并发订单很多，那说明你的业务已经很大了，不应该再考虑 v 免签的这种支付方式，更应该接入官方的支付接口

考虑到以后可能通过配置选择是否支持并发订单冲突，界面上的区分方式配置暂时保留，但是在移除金额冲突的版本中，这里的配置是没有效果的

![](/archives/vmq-deploy/2ddget.png) 

#### 2、增加了监控

监控分为两个层面的

一个是直接输入自己的 health 网址如 `https://www.xxx.com/health` 访问，显示手机客户端的心跳状态，单个条目为 5分钟，能查看大概最近 12 个小时的状态

![](/archives/vmq-deploy/zehun1.png)

另外一个是提供 http 接口给 Uptime Kuma 等类似的监控使用，来检查业务是否异常

![](/archives/vmq-deploy/r18lqd.png)

监控的方式也比较粗暴，每次心跳的时候，将心跳时间保存到服务器本地文件中，服务器中保存最近的 10000 条心跳记录

在 Uptime Kuma 中将服务状态直接拉到自己这侧，只要  Uptime Kuma 中的数据不清理，理论上  Uptime Kuma 可以保存所有的监控记录


### 主要配置

在 vmqphp 服务端进行配置的时候，有几个注意的地方，这里以宝塔面板界面操作进行指引，手工配置 nginx 和 apache 类似

#### 网站目录设置

php 的版本是基于 thinkphp 框架开发的，运行目录需要设置为 public 目录，open_basedir 限制导致了框架文件无法被正确加载，需要关闭防跨站攻击

![](/archives/vmq-deploy/3dcgc3.png)

#### 伪静态配置

在伪静态的下拉框列表中选择 thinkphp 的版本，或者手工输入以下配置进行保存

```nginx
location ~* (runtime|application)/{
	return 403;
}
location / {
	if (!-e $request_filename){
		rewrite  ^(.*)$  /index.php?s=$1  last;   break;
	}
}
```

![](/archives/vmq-deploy/imnisu.png)


#### 默认文档配置

新建站点的时候，默认的文档为 `index.php`  优先，需要将默认文档修改改为 `index.html` 优先

![](/archives/vmq-deploy/d9u4gv.png)


## 手机端部署

这里简述安卓客户端 apk 的编译，至于 php 版本的服务端直接部署就行，不需要编译，原安卓版本已经比较老旧，在此基础上进行了较大的修改

### 版本变动

#### 1、支持 http 以及 https 

原版本代码中写死了只支持 http 协议，修改后版本支持界面中选择 http 或者 https 协议

#### 2、增加后台保活

安卓手机中操作系统可能在平时，出于对资源的回收利用，或者在没有关闭休眠省电配置时，在晚上到凌晨这段时间，会主动将进程杀死

在进程被杀后可以自动拉起，拉起的进程是以服务的方式运行的，默认是没有界面的，但不影响收款功能，进程拉起后，如需显示界面得手工点击应用启动

可以通过心跳监控查看客户端是否处于正常状态，手动终止后进程会自动拉起，被系统杀死也是一样的拉起模式

![](/archives/vmq-deploy/csaipy.png)

#### 3、支持较新版本的微信和支付宝

原版本中对通知消息的处理，是基于比较旧版的微信和支付宝，通知消息格式已经发生变动，旧版本无法处理新版的通知消息，导致订单无法正常完成

#### 4、其他优化

增加日志以及清理、修复部分 bug、移除手工配置（使用扫码配置就可以），以及其他一些优化

### 版本构建

添加签名进行构建

![](/archives/vmq-deploy/fpdjiv.png)

编译后，生成 debug 和 release 版本

![](/archives/vmq-deploy/lu0hiq.png)

也可以添加 build.bat 脚本，通过运行脚本的方式进行构建，脚本内容如下，构建后生成 release 版本的安装包

```shell
.\gradlew clean && .\gradlew assembleRelease
pause
```
![](/archives/vmq-deploy/r5kk1n.png)

### 通知配置

这里以红米手机为例，其他手机可能步骤有所不同（未进行广泛测试，其他手机也可能无法正常运行），将 apk 文件上传到手机中，点击进行应用安装

安装完毕后，在弹出的 `设备和应用通知` 窗口中选择 v 免签，接下来的窗口中 `授予通知使用权` 是灰色的，点击会弹出受限制的设置窗口

![](/archives/vmq-deploy/n70jec.png)

点击界面中图标位置，在界面中将通知权限设置为允许，以及底下的 `更多` 中设置 `允许受限制的设置`

![](/archives/vmq-deploy/9ttxb6.png)

上面两个配置设了之后，就可以在 `设备和应用通知` 窗口进行开启 `授予通知使用权`，它这时候还是灰色的，不过已经是可以点击的了

点击开启后，会弹出一个危险的窗口，因为需要读取手机的通知消息，通知消息属于隐私消息，所有会有一个危险的提示

勾选知晓风险，等待 10 秒后，点击确定，就完成开启通知使用权了

![](/archives/vmq-deploy/4n3tb7.png)

### 扫码配置

前面通知配置完毕之后，客户端就正常使用了，启动后，建议勾选 https 协议，然后进行扫码配置

扫码配置后，界面显示 `应用初始化成功` 则表示已经配置成功了，可以点击 `检测心跳` 和 `检测监听` 来确认应用是否正常

![](/archives/vmq-deploy/y19j1r.png)


## 模拟器部署

这里的模拟器是指在 android studio 中进行安装的模拟器 `Medium Phone`，其他类型的模拟器可能有所不同

### 网络配置

空白处下滑，然后点击 internet，在弹出的窗口中启用 T-Mobile

![](/archives/vmq-deploy/exdz0f.png)

### 应用卸载

空白处上滑，显示安装的 app 应用列表，点击支付应用3秒钟，弹出应用的菜单，点击 “app info”，在显示的应用页面上点击 “uninstall” 进行卸载应用

![](/archives/vmq-deploy/vxbn2r.png)

### 通知配置

在 “app info” 页面上，点击 “Notifications” ，在新的页面上进行授权 notification

![](/archives/vmq-deploy/z7fuej.png)