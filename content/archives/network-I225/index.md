---
categories:
- 默认分类
date: '2026-02-06 14:14:24+08:00'
description: ''
draft: false
image: ''
slug: network-i225
cover: /archives/network-i225/nc4gnp.png
tags:
- Intel
- network
- I225-V
title: Intel网卡I225-V无法正常连网问题
---

机器通过有线连接网络，手工配置的 ip 地址，之前还能正常联网使用，突然间就网络异常了

无法 ping 通网关 192.168.10.1，无法访问 baidu 等 web 网站，但是可以 ping 通过相同内网的其他机器，并且可以 mstsc 远程访问

在右下角的网络图标显示为一个地球，提示无法连接到 Internet ，查看本地的配置显示如下图，这里多了一个诡异的地址 168.254.54.210 并且设置为首选

![](/archives/network-i225/nc4gnp.png)

重置网络配置后，还是不行

```
netsh int ip reset
netsh winsock reset
```

网络了解发现是 Intel I225-V 的驱动缺陷导致，常见于 Intel 2.5G 有线网卡芯片上的 B560 / Z590 / B660 / Z690 / Z790主板上

所以修复的办法就是更新 Intel 的官方网卡驱动，下载地址在这里 `https://downloadmirror.intel.com/872810/Release_31.0.zip` 这个是个大而全的驱动列表

![](/archives/network-i225/quelul.png)

下载后解压出来，在设备管理器中进行安装驱动，选中网络适配器 `Intel(R) Ethernet Controller (3) I225-V`  然后右键 “更新驱动程序”

在弹出的窗口中，选择 “浏览我的电脑以查找驱动程序”，选择刚解压的 `Release_31.0` 目录自动搜索，安装完毕后，有线网络就恢复正常了

![](/archives/network-i225/31uwmn.png)