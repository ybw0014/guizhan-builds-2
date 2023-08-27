export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook("i18n:localeSwitched", () => {
    refreshNuxtData();
  });
});
