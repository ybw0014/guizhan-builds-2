<template>
  <header class="bg-default">
    <nav>
      <!-- 左侧顶部菜单 -->
      <div class="flex items-center gap-4">
        <NuxtLink :to="{ name: 'index' }" class="brand">
          <img src="/images/brand.jpg" class="brand-image" />
          {{ $t('title') }}
        </NuxtLink>
      </div>
      <!-- 中间留空区 -->
      <div class="grow"></div>
      <!-- 右侧顶部菜单 -->
      <div class="flex items-center gap-2">
        <ThemeSwitcher class="link-box" />
        <LanguageSwitcher class="link-box" />
      </div>
    </nav>
  </header>
</template>

<style scoped lang="scss">
header {
  @apply shadow-md text-base py-2;
}
nav {
  @apply mx-auto container flex flex-wrap justify-center gap-2;
}
.brand {
  @apply flex gap-2 font-semibold py-2;

  .brand-image {
    @apply max-h-6 rounded-full;
  }
}
</style>
