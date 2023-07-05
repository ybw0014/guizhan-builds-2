# 鬼斩构建站v2 - 前端

拿来练手的项目，[鬼斩构建站](https://github.com/ybw0014/guizhan-builds)的第二版。

## 添加你的项目

你可以将任意 Maven/Gradle 项目添加到构建站。

Fork 本仓库，并在 `public/repos.json` 文件中修改或添加你的项目信息。

具体的配置项可以在此[文档](./README_repos.md)中查看。

## 构建

构建站基于 GitHub Actions 每10分钟运行一次（具体时间可能会有一定的浮动），检测仓库的最新commit与最新构建的，如果不匹配则会触发构建。

具体的流程可以在[后端项目](https://github.com/ybw0014/guizhan-builds-2-backend)中查看。
