export default defineNuxtRouteMiddleware(async (to, _) => {
  // 根路径时不需要重定向
  if (!to.path.slice(1).includes('/')) {
    return;
  }

  const path = to.path.slice(1).split('/');
  if (path[0] === 'f') {
    // 旧版构建信息存储，重定向至R2
    if (path.length < 5) {
      throw createError({ statusCode: 404, message: 'Not Found' });
    }
    const [, author, repo, branch, ...rest] = path;
    const project = await useProject(author, repo, branch);
    if (!project.value) {
      throw createError({ statusCode: 404, message: 'Not Found' });
    }
    await navigateTo(`/r2/${project.value.author}/${project.value.repository}/${project.value.branch}/${rest.join('/')}`, {
      redirectCode: 302,
      external: true
    });
  } else if (path.length === 4) {
    if (path[path.length - 1].toLowerCase() === 'badge.svg') {
      // v2初代徽章路径，重定向至R2统一路径
      const [author, repo, branch] = path.slice(0, -1);
      await navigateTo(`/f/${author}/${repo}/${branch}/badge.svg`, { redirectCode: 301, external: true });
    } else {
      // 旧版访问指定构建版本，重定向至新版路径
      const [author, repo, branch, build] = path;
      if (/^\d+$/.test(build)) {
        await navigateTo(`/${author}/${repo}/${branch}/builds/${build}`, { redirectCode: 301, external: true });
      }
    }
  }
});
