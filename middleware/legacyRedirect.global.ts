export default defineNuxtRouteMiddleware(async (to, _) => {
  // 获取 host
  const r2Host = useR2Host();

  // 根路径时不需要重定向
  if (!to.path.slice(1).includes("/")) {
    return;
  }

  const path = to.path.slice(1).split("/");
  if (path[0] === "f") {
    // 旧版构建信息存储，重定向至R2
    if (path.length < 5) {
      throw createError({ statusCode: 404, message: "Not Found" });
    }
    const [, author, repo, branch, ...rest] = path;
    const project = await useProject(author, repo, branch);
    if (!project.value) {
      throw createError({ statusCode: 404, message: "Not Found" });
    }
    navigateTo(
      new URL(`${project.value.author}/${project.value.repository}/${project.value.branch}/${rest.join("/")}`, `https://${r2Host}/`).toString(),
      {
        redirectCode: 302,
        external: true
      }
    );
  } else if (path[path.length - 1] === "badge.svg") {
    // 构建信息badge，直接重定向至R2
    navigateTo(new URL(to.fullPath, `https://${r2Host.value}/`).toString(), {
      redirectCode: 302,
      external: true
    });
  } else if (path.length === 4) {
    // 旧版访问指定构建版本，重定向至新版路径
    const [author, repo, branch, build] = path;
    if (/^\d+$/.test(build)) {
      navigateTo(`/${author}/${repo}/${branch}/builds/${build}`, { redirectCode: 301, external: true });
    }
  }
});
