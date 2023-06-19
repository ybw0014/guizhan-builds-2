# 鬼斩构建站v2

拿来练手的项目，[鬼斩构建站](https://github.com/ybw0014/guizhan-builds)的第二版。使用 Nuxt 3 相关技术栈，并将构建结果上传至 Cloudflare R2（之前是直接在Git里）。

## 添加你的项目

你可以将任意 Maven/Gradle 项目添加到构建站。

Fork 本仓库，并在 `public/repos.json` 文件中修改或添加你的项目信息。

具体的配置项可以在此[文档](./README_repos.md)中查看。

## 触发构建

构建站每10分钟（以 GitHub Actions 具体运行时间为准）进行一次全项目遍历，检测每个项目的最新提交。如果检测到有新提交，将会触发构建。

如果提交信息中包含 `[CI skip]`（不区分大小写），将不会进行新的构建。


