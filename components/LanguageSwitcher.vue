<script setup lang="ts">
import { LocaleObject } from 'vue-i18n-routing'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'

const { locale, setLocale, locales } = useI18n()
const currentLocale = computed(() => locale.value)
const availableLocales = computed(() => {
  return locales.value as LocaleObject[]
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="lang-switcher link-box">
      <Icon name="dashicons:translation" class="icon" />
    </MenuButton>

    <Transition name="dropdown-menu">
      <MenuItems class="menu-items bg-default">
        <MenuItem v-for="locale in availableLocales" :key="locale.code">
          <a href="javascript:void(0)" class="menu-item link-box" @click="setLocale(locale.code)">
            <Icon name="ic:round-check" v-if="currentLocale === locale.code" /> {{ locale.name }}
          </a>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>

<style scoped lang="scss">
.lang-switcher {
  @apply px-2 py-2 rounded-md flex justify-center;
}
.menu-items {
  @apply absolute right-0 z-10 mt-2 w-28 py-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none;
}
.menu-item {
  @apply block px-4 py-2 text-sm;
}
.icon {
  @apply text-lg;
}
</style>
