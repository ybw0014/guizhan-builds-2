# 鬼斩构建站 v2

> [!IMPORTANT]
> 鬼斩构建站 v2 不会再有任何功能性更新。第三代构建站（到时候可能不叫构建站了）已在开发中，会在开发完成后提供便捷的迁移方法。
> 本仓库仍然接受新项目与现有项目信息更新的 PR。

拿来练手的项目，[鬼斩构建站](https://github.com/ybw0014/guizhan-builds)的第二版。

鬼斩构建站利用 GitHub Actions 自动构建所有项目，并上传至 Cloudflare R2。  
前端页面使用 Nuxt.js 框架并部署到 Cloudflare Pages。  
API 使用 Cloudflare Workers 部署。

## 添加你的项目

目前，issue 的自动添加项目暂未实现，所以你需要通过提交 Pull Request 来添加你的项目。

1. Fork 本仓库
2. 在 `frontend/public/repos.json` 中添加你的项目（查阅此[文档](./README_repos.md)）
3. 提交 Pull Request
