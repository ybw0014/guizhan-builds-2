<script setup lang="ts">
import type { LocaleObject } from 'vue-i18n-routing';
const { locale, setLocale, locales } = useI18n();
const currentLocale = computed(() => locale.value);
const availableLocales = computed(() => {
  return locales.value as LocaleObject[];
});
</script>

<template>
  <UPopover as="div" class="relative inline-block text-left">
    <UButton variant="link" color="black" class="link-box">
      <UIcon name="i-dashicons-translation" class="text-lg" />
    </UButton>

    <template #panel="{ close }">
      <div class="flex flex-col">
        <ULink v-for="aLocale in availableLocales" :key="aLocale.code" :class="{ 'px-4 py-2 link-box': true, active: currentLocale == aLocale.code }" @click="setLocale(aLocale.code);close();">
          {{ aLocale.name }}
        </ULink>
      </div>
    </template>
  </UPopover>
</template>
