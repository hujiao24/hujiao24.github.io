---
categories:
- 默认分类
date: '2025-12-23 17:57:24+08:00'
description: ''
draft: false
image: ''
slug: postgres
cover: /archives/postgres/7b9jgn.png
tags:
- postgres
title: 数据库postgres的安装和使用
---

在 ubuntu 下通过 `apt install postgresql` 进行安装 postgres，在数据库软件安装完毕之后，postgres 就会自动启动

![](/archives/postgres/h8pcm7.png)

默认情况下是没有设置密码的，在终端下切换至 postgres 系统账户（安装 postgres 的时候自动生成），并运行命令行终端 psql `sudo -u postgres psql`

在数据库的终端下输入 `\password` 进行连续两次输入创建管理员密码，`\` 是命令提示符，可以通过 `\?` 查看更多的 help 信息

![](/archives/postgres/3pvp8x.png)

默认 postgres 是使用 peer 认证（本地登录无需密码），如果需要远程访问的话，修改 `/etc/postgresql/16/main/pg_hba.conf` 文件

添加一行如下的配置，表示使用密码认证方式

![](/archives/postgres/7b9jgn.png)

另外就是还需要修改端口的监听地址，默认监听 `127.0.0.1` 只允许本机访问，修改 `/etc/postgresql/16/main/postgresql.conf` 中的配置

找到 listen_addresses 这行配置，默认是注释掉的，取消注释并修改其值为 `*` 或者 `0.0.0.0`

```conf
listen_addresses = '0.0.0.0'
```

以上两个配置修改完毕后，使用 `systemctl restart postgresql` 重启服务，再查看监听已经正常了，通过 dbeaver 可以正常连接了

![](/archives/postgres/43dhlz.png)

![](/archives/postgres/in20rs.png)

这里还有一个坑，在 dbeaver 中新建 postgres 数据库连接的时候，默认是不会勾选 `显示所有数据库` 的，导致连接上后只会显示这里填入的数据库

另外在 postgres 标签页，可以把这里的全部勾选上，然后在 dbeaver 中连接上后，就和普通的 mysql 使用没有什么区别了

![](/archives/postgres/1ncf56.png)

![](/archives/postgres/lpvqv8.png)