export default defineNuxtRouteMiddleware((to, from) => {
  if (to.fullPath.endsWith("badge.svg")) {
    navigateTo(new URL(to.fullPath, "https://builds-r2.gzassets.net/").toString(), {
      redirectCode: 302,
      external: true
    });
  }
});
