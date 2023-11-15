<script setup lang="ts">
const props = defineProps<{
  href: string;
  target?: '_blank' | '_self' | '_parent' | '_top';
}>();

const isExternal = computed(() => {
  return props.href.startsWith('http');
});
</script>

<template>
  <NuxtLink v-if="isExternal" :to="{ name: 'external', query: { link: props.href } }" target="_blank">
    <slot />
    <UIcon name="i-dashicons-external" class="font-normal w-4 h-4 ml-0.5 text-gray-400" />
  </NuxtLink>
  <NuxtLink v-else :href="props.href" :target="props.target">
    <slot />
  </NuxtLink>
</template>
