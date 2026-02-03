---
categories:
- 默认分类
date: '2026-02-03 17:09:24+08:00'
description: ''
draft: false
image: ''
slug: ae-plugins
cover: /archives/ae-plugins/lgv605.png
tags:
- After Effects 
title: AE插件初步了解
---

AE中的插件功能有几大类 

## 纯粹的脚本插件

在 `C:\Program Files\Adobe\Adobe After Effects 2021\Support Files\Scripts` 目录下新建 Hello.jsx 文件

```js
alert("Hello After Effects!");
```

然后在 “文件” 菜单下点击 “脚本” 菜单项，弹出 Hello.jsx 项，点击运行脚本

![](/archives/ae-plugins/lgv605.png)


## 带界面的插件

是否带界面，取决于要不要和用户进行交互，逻辑上并没有太大的区别

在 `C:\Program Files\Adobe\Adobe After Effects 2021\Support Files\Scripts\ScriptUI Panels` 目录下新建 HelloUI.jsx 文件，代码如下


```js
var win = new Window("palette", "我的插件");

var btn = win.add("button", undefined, "点我");

btn.onClick = function () {
    alert("你好 AE");
};

win.show();

```

在 “窗口” 菜单的最底下出现一个 HelloUI.jsx 项，点击弹出插件界面 

![](/archives/ae-plugins/zugxne.png)

上面这两种方式都是基于 javascript 进行开发的，AE 提供了完整 API，在 js 代码中可以直接使用，比如

```js
app.project            // 项目
app.project.items      // 所有素材
app.project.activeItem // 当前合成
```
## 原生插件

插件在 `C:\Program Files\Adobe\Adobe After Effects 2021\Support Files\Plug-ins` 目录下后缀为 aex 的文件，本质上就是动态库文件

这些 aex 文件使用 visual studio 的 c++ 开发，需要下载官方的 sdk 依赖包，sdk 下载地址 `https://developer.adobe.com/after-effects/`

![](/archives/ae-plugins/e62max.png)

原生插件功能强大，通过原生插件可以实现几乎所有的 AE 效果和通用功能，实现上比上面的 js 代码插件复杂

安装后插件位于 “效果” 菜单下，子菜单没有固定目录，需要在插件的代码中进行指定，这里了解下即可

![](/archives/ae-plugins/9qtdp5.png)

## CEP插件

这里插件安装在 `C:\Program Files (x86)\Common Files\Adobe\CEP\extensions` 目录下，CEP 插件相比 ScriptUI 插件在界面能力上有很大的改进

动画能力非常强大，适合于大型的插件工具开发，开发复杂度高，ScriptUI 则通常应用在一些较小的功能脚本上

插件安装后，出现在 “窗口” 菜单下的 “扩展” 子菜单目录下，CEP 插件目前已不推荐，未来会被逐步弃用

![](/archives/ae-plugins/7zzs6j.png)

## UXP 插件

UXP（Unified Extensibility Platform） 是 Adobe 推出的现代插件平台，旨在逐步替代旧的 CEP 插件

UXP 的目标是为 Adobe 应用提供更现代的 UI 构建方式，可使用现代浏览器技术构建插件界面，类似 node 项目，通过 node 进行构建打包

UXP 插件安装目录在 `C:\Program Files\Common Files\Adobe\UXP\extensions`，菜单下的目录和 CEP 插件一样，也是位于  “窗口” 菜单下的 “扩展” 子菜单目录下

![](/archives/ae-plugins/9tzql7.png)