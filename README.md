# 鬼斩构建站 v2

> [!IMPORTANT]
> 鬼斩构建站 v2(本仓库)早已停止功能更新,目前只合并仓库信息相关的 PR。2026-10-18 起将停止接受新项目 PR 并关闭自动构建;2026-11-15 起全面停止服务,域名跳转至鬼斩资源站。
>
> 鬼斩资源站是计划已久、现已基本可用的下一代 Slimefun/Pylon 资源分享平台。请尽快迁移项目:[点击迁移](https://resources.guizhanss.com/project/import/guizhan-builds-v2)。完整公告见[本站停止服务公告](https://builds.guizhanss.com/sunset)。

拿来练手的项目，[鬼斩构建站](https://github.com/ybw0014/guizhan-builds)的第二版。

鬼斩构建站利用 GitHub Actions 自动构建所有项目，并上传至 Cloudflare R2。
前端页面使用 Nuxt.js 框架并部署到 Cloudflare Pages。
API 使用 Cloudflare Workers 部署。

## 添加你的项目

目前，issue 的自动添加项目暂未实现，所以你需要通过提交 Pull Request 来添加你的项目。

1. Fork 本仓库
2. 在 `frontend/public/repos.json` 中添加你的项目（查阅此[文档](./README_repos.md)）
3. 提交 Pull Request
