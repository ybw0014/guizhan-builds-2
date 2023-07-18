<template>
  <footer class="bg-default mt-10 flex relative justify-center">
    <div class="footer-items">
      <div class="footer-items__list">
        <NuxtLink :href="useExternalLinkHelper('https://github.com/ybw0014/guizhan-builds-2')" class="link-box" target="_blank">
          {{ $t("components.footer.github") }}
        </NuxtLink>
        <NuxtLink :to="{ name: 'terms' }" class="link-box">{{ $t("components.footer.terms") }}</NuxtLink>
        <NuxtLink :to="{ name: 'privacy' }" class="link-box">{{ $t("components.footer.privacy") }}</NuxtLink>
      </div>
      <p class="font-bold">
        &copy; {{ new Date().getFullYear() }}
        <NuxtLink :href="useExternalLinkHelper('https://ybw0014.dev/')" target="_blank">ybw0014</NuxtLink>
      </p>
    </div>
  </footer>
</template>

<style scoped lang="scss">
.footer-items {
  @apply flex flex-wrap flex-row-reverse grow gap-4 justify-around items-center my-3 container text-sm;

  .footer-items__list {
    @apply flex flex-row flex-wrap justify-center gap-1;

    & > * {
      @apply flex items-center rounded-md px-6 py-2 transition-colors;
    }
  }
}
</style>
