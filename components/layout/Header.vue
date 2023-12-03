<script setup lang="ts">
const route = useRoute();

const navLinks = [
  { link: 'index', label: 'projects' },
  { link: 'authors', label: 'authors' },
  { link: 'sf-subscription', label: 'sfSubscription' }
];
</script>

<template>
  <header class="bg-default shadow-md text-base py-2 md:px-2">
    <nav class="mx-2 sm:mx-auto container flex flex-wrap justify-center gap-2 w-auto">
      <!-- 左侧顶部菜单 -->
      <div class="flex items-center gap-4">
        <!-- 小屏幕导航 -->
        <UPopover class="relative inline-block sm:hidden">
          <UButton variant="link" color="gray" class="link-box">
            <UIcon name="i-ic-round-menu" class="text-lg" />
          </UButton>

          <template #panel="{ close }">
            <div class="flex flex-col">
              <ULink
                v-for="navLink in navLinks"
                :key="navLink.link"
                :to="{ name: navLink.link }"
                :class="{ 'link-box px-4 py-2': true, active: navLink.link === route.name }"
                @click="close"
              >
                {{ $t(`components.header.nav.${navLink.label}`) }}
              </ULink>
            </div>
          </template>
        </UPopover>
        <!-- 首页链接 -->
        <ULink to="/" class="text-lg flex gap-2 font-semibold py-2 items-center">
          <img src="/images/brand.jpg" class="max-h-6 rounded-full" />
          {{ $t('title') }}
        </ULink>
        <!-- 导航 -->
        <div class="nav-links">
          <ULink
            v-for="navLink in navLinks"
            :key="navLink.label"
            :to="{ name: navLink.link }"
            :class="{ 'nav-link': true, active: navLink.link === route.name }"
          >
            {{ $t(`components.header.nav.${navLink.label}`) }}
          </ULink>
        </div>
      </div>
      <!-- 中间留空区 -->
      <div class="grow"></div>
      <!-- 右侧顶部菜单 -->
      <div class="flex items-center gap-2">
        <ThemeSwitcher />
        <LanguageSwitcher />
      </div>
    </nav>
  </header>
</template>

<style lang="scss">
header {
  .button {
    @apply px-2 py-2 rounded-md flex justify-center;
  }

  .nav-links {
    @apply gap-4 ml-2 hidden sm:flex md:items-center;

    .nav-link {
      @apply block relative;

      &.active {
        @apply text-primary-500;

        &:after {
          @apply w-[80%] bg-gradient-to-r from-primary-300 to-primary-500;
        }
      }

      &:after {
        @apply absolute block content-[""] w-0 h-1 rounded-lg left-[10%] top-7 transition-[width] bg-gray-300;
        @apply hover:w-[80%];
      }
    }
  }
}
</style>
