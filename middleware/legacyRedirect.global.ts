export default defineNuxtRouteMiddleware(async (to, from) => {
  if (!to.path.slice(1).includes("/")) {
    return;
  }
  const path = to.path.slice(1).split("/");
  if (path[0] === "f") {
    if (path.length < 5) {
      throw createError({ statusCode: 404, message: "Not Found" });
    }
    const [ f, author, repo, branch, ...rest ] = path;
    const project = await useProject(author, repo, branch);
    if (!project.value) {
      throw createError({ statusCode: 404, message: "Not Found" });
    }
    navigateTo(new URL(`${project.value.author}/${project.value.repository}/${project.value.branch}/${rest.join("/")}`, "https://builds-r2.gzassets.net/").toString(), {
      redirectCode: 302,
      external: true
    });
  } else if (path[path.length - 1] === "badge.svg") {
    navigateTo(new URL(to.fullPath, "https://builds-r2.gzassets.net/").toString(), {
      redirectCode: 302,
      external: true
    });
  } else if (path.length === 4) {
    const [author, repo, branch, build] = path;
    if (/^\d+$/.test(build)) {
      navigateTo(`/${author}/${repo}/${branch}/builds/${build}`, { redirectCode: 301, external: true });
    }
  }
});
