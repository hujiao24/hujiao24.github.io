---
categories:
- 默认分类
date: '2025-12-25 14:11:24+08:00'
description: ''
draft: false
image: ''
slug: rust-tauri
cover: /archives/rust-tauri/x9ft5h.png
tags:
- rust
- tauri
title: 基于tauri构建全平台应用
---

可以基于 tauri 开发构建全平台的应用，和 electron 的发布版本动辄百兆不同，tauri 是基于 rust 的，发布版本可以做到几兆大小

tauri 本质上是一个轻量级桌面应用壳，通过前端技术做界面展示，因此 tauri 开发也是需要 node 环境的，但是发布版本的时候不会打包浏览器内核

本地开发需要 node 环境正常，rust 安装通过 `https://rust-lang.org/tools/install/` 进行下载安装

项目前端如果是纯静态 `html/css/js`，也可以不需要 node 环境，通过下载 `cargo install tauri-cli`，使用 `cargo tauri build` 进行构建打包应用

主流的前端开发都是基于现代框架（react、vue等），所有 node 环境还是必须的，基于 node 环境的话，就可以不需要手动安装 `tauri-cli` 了

下面通过一个例子，来快速熟悉整个构建流程

1、通过 `pnpm create tauri-app` 新建一个 tauri 项目，全部默认就可以

![](/archives/rust-tauri/a0rmgs.png)

创建的项目有两部分代码，`src` 是前端的代码，`src-tauri` 是应用壳的 tauri 代码

并且在依赖关系这里也可以看到，提供了基于 node 生态的 tauri 开发工具链，负责构建、打包、运行后端的 rust 代码部分

![](/archives/rust-tauri/rh5jho.png)
 
2、通过 `pnpm install` 安装依赖，这个和 node 项目一致，没什么区别

3、本地开发运行 `pnpm run tauri dev`，编译生成一个 debug 版本的执行文件，然后将执行文件运行起来

![](/archives/rust-tauri/uck6fz.png)

![](/archives/rust-tauri/s1hqy6.png)

4、编译发布版本 `pnpm run tauri build`，这个命令会编译 release 版本的执行文件，并且生成 `msi` 和 `nsis` 两种类型的安装包

![](/archives/rust-tauri/0w1uxt.png)

5、下面来删除 target 目录，先将前端代码构建出来，然后再使用 cargo 命令进行打包执行文件（需要先手动安装 tauri-cli）

首先通过 `pnpm run build` 打包生成前端的 dist 目录

![](/archives/rust-tauri/r9yfrc.png)

而 `tauri.conf.json` 配置指示了前端代码目录为 `../dist`，由于 build 配置还有前置的 pnpm 命令，因此可以删除其他的 pnpm 命令只保留 frontendDist 配置

![](/archives/rust-tauri/x9ft5h.png)

接着 cd 到 `src-tauri` 目录下，再通过原生命令 `cargo tauri build` 进行打包构建，一样生成了 `msi` 和 `nsis` 两种类型的安装包

![](/archives/rust-tauri/m0i2ff.png)