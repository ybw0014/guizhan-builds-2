# 鬼斩构建站 v2

拿来练手的项目，[鬼斩构建站](https://github.com/ybw0014/guizhan-builds)的第二版。

鬼斩构建站利用 GitHub Actions 自动构建所有项目，并上传至 Cloudflare R2。  
前端页面使用 Nuxt.js 框架并部署到 Cloudflare Pages。  
API 使用 Cloudflare Workers 部署。

## 添加你的项目

目前，issue 的自动添加项目暂未实现，所以你需要通过提交 Pull Request 来添加你的项目。

1. Fork 本仓库
2. 在 `frontend/public/repos.json` 中添加你的项目（查阅此[文档](./README_repos.md)）
3. 提交 Pull Request
