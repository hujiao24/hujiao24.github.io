---
categories:
- 默认分类
date: '2025-10-27 16:21:24+08:00'
description: ''
draft: false
image: ''
slug: through-gfw
cover: /archives/through-gfw/jslc78.png
tags:
- network
title: v2ray工具的安装和使用
---

## 前言

基于国内互联网环境的持续恶化，科学上网已经成为一项必备技能，这里以 v2ray 进行搭建，以下搭建仅供个人使用

官方指导地址 `https://www.v2fly.org/guide/start.html `

## 服务端部署

安装前需要有一台海外的 linux 服务器节点，以 ubuntu 为例进行安装 v2ray 服务端，详细参考 `https://github.com/v2fly/fhs-install-v2ray` 

使用下面命令行进行服务端安装

```shell
bash <(curl -L https://raw.githubusercontent.com/v2fly/fhs-install-v2ray/master/install-release.sh)
```

安装后，修改配置文件 `/usr/local/etc/v2ray/config.json`，修改为如下，端口可根据需要修改，id 部署的时候需要重新生成

也可以在这里 `https://tools.qc7.org/uuid/` 生成一个全新的 uuid 替换配置中的 id 值

```json
{
    "log": {
        "loglevel": "debug",
        "access": "/var/log/v2ray/access.log",
        "error": "/var/log/v2ray/error.log"
    },
    "inbounds": [
        {
            "port": 10086,
            "protocol": "vmess",
            "settings": {
                "clients": [
                    {
                        "id": "b831381d-6324-4d53-ad4f-8cda48b30811"
                    }
                ]
            }
        }
    ],
    "outbounds": [
        {
            "protocol": "freedom"
        }
    ]
}
```

日志级别 loglevel 根据需要可以设定为 debug、info、warning、error、none，其中 none 表示不记录任何日志

服务的端口需要在防火墙中放行，如 ubuntu 下可以通过 `ufw allow 10086` 进行开启，然后使用 `systemctl restart v2ray.service` 启动 v2ray 服务

## 客户端配置

在本地客户端启动后，添加一个 vmess 的配置，这里的 vmess 是和服务端配置中的 protocol 字段对应的，需要前后保持一致

![](/archives/through-gfw/2h9h1e.png)

在配置窗口中，填入服务端的信息，然后确定

![](/archives/through-gfw/x1hqzt.png)

回到 vmess 界面，选定添加的记录，然后右键 `设为活动配置文件`

![](/archives/through-gfw/1chxhf.png)

在任务栏中，选择 v2ray 的图标，右键在弹出的菜单中指定 `pac 模式`，路由选择 `绕过大陆`，配置选择刚添加的节点

![](/archives/through-gfw/hbdkix.png)

这时候如果没问题的话，访问 google.com 以及 youtube.com 等一些被墙站点，应该是可以正常的，v2ray 界面中日志显示如下

![](/archives/through-gfw/jslc78.png)

## 其他问题

这种部署方式建议作为备选方案，个人节点如果长时间跑大流量的话，估计很容易被墙，未经长时间测试，仅仅是个人的看法

另外，在自行部署的时候不要选购香港的 vps 节点，香港的节点是无法解锁 chatgpt、gemini、claude 等主流的 AI 服务的，不过似乎 grok 不受影响

![](/archives/through-gfw/6m2frl.png)