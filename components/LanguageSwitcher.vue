<script setup lang="ts">
import { LocaleObject } from "vue-i18n-routing";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/vue";

const { locale, setLocale, locales } = useI18n();
const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return locales.value as LocaleObject[];
});
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <MenuButton class="button link-box">
      <Icon name="dashicons:translation" class="icon" />
    </MenuButton>

    <Transition name="dropdown-menu">
      <MenuItems class="menu-items right-0 bg-default border-t-2 border-blue-500">
        <MenuItem v-for="aLocale in availableLocales" :key="aLocale.code">
          <a
            href="javascript:void(0)"
            :class="{ 'menu-item link-box': true, active: currentLocale == aLocale.code }"
            @click="setLocale(aLocale.code)"
          >
            {{ aLocale.name }}
          </a>
        </MenuItem>
      </MenuItems>
    </Transition>
  </Menu>
</template>
