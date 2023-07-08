<script setup lang="ts">
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/vue'

const route = useRoute()

const navLinks = [
  { link: 'index', label: 'projects' },
  { link: 'authors', label: 'authors' }
]
</script>

<template>
  <header class="bg-default">
    <nav>
      <!-- 左侧顶部菜单 -->
      <div class="flex items-center gap-4">
        <!-- 小屏幕导航 -->
        <div>
          <Popover as="div" class="relative inline-block sm:hidden">
            <PopoverButton class="button link-box">
              <Icon name="ic:round-menu" class="icon" />
            </PopoverButton>

            <Transition name="dropdown-menu">
              <PopoverPanel v-slot="{ close }" class="nav-sidebar menu-items left-0 bg-default">
                <NuxtLink
                  v-for="navLink in navLinks"
                  :key="navLink.link"
                  :to="{ name: navLink.link }"
                  :class="['nav-link menu-item link-box', navLink.link === route.name ? 'active' : '']"
                  @click="close"
                >
                  {{ $t(`components.header.nav.${navLink.label}`) }}
                </NuxtLink>
              </PopoverPanel>
            </Transition>
          </Popover>
        </div>
        <!-- 首页链接 -->
        <NuxtLink :to="{ name: 'index' }" class="brand">
          <img src="/images/brand.jpg" class="brand-image" />
          {{ $t('title') }}
        </NuxtLink>
        <!-- 导航 -->
        <div class="nav-links">
          <NuxtLink
            v-for="navLink in navLinks"
            :key="navLink.label"
            :to="{ name: navLink.link }"
            :class="{ 'nav-link': true, active: navLink.link === route.name }"
          >
            {{ $t(`components.header.nav.${navLink.label}`) }}
          </NuxtLink>
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

<style scoped lang="scss">
header {
  @apply shadow-md text-base py-2;
}
nav {
  @apply mx-2 sm:mx-auto container flex flex-wrap justify-center gap-2 w-auto;
}
.brand {
  @apply text-lg flex gap-2 font-semibold py-2 items-center;

  .brand-image {
    @apply max-h-6 rounded-full;
  }
}
.nav-sidebar {
  @apply border-t-2 border-blue-500;
}
.nav-links {
  @apply gap-4 ml-2 hidden sm:flex md:items-center;

  .nav-link {
    @apply block relative;

    &.active {
      @apply text-blue-500;

      &:after {
        @apply w-[80%];
        background: linear-gradient(-270deg, #004ee9 0%, #367aff 100%);
      }
    }

    &:after {
      @apply absolute block content-[""] w-0 h-1 rounded-lg left-[10%] top-7 transition-[width] bg-gray-300;
      @apply hover:w-[80%];
    }
  }
}
</style>

<style lang="scss">
header {
  .button {
    @apply px-2 py-2 rounded-md flex justify-center;
  }

  .icon {
    @apply text-lg;
  }
}
</style>
