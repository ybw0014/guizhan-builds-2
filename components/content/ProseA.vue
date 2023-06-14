<script setup lang="ts">
const props = defineProps<{
  href: string
  target?: '_blank' | '_self' | '_parent' | '_top'
}>()

const isExternal = computed(() => {
  return props.href.startsWith('http')
})
</script>

<template>
  <NuxtLink :href="props.href" :target="props.target">
    <slot />
    <Icon name="dashicons:external" class="external-icon" v-if="isExternal" />
  </NuxtLink>
</template>

<style scoped lang="scss">
.external-icon {
  @apply font-normal w-4 h-4 ml-1 text-gray-400;
}
</style>
