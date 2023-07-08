<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to?: RouteLocationRaw
  active?: boolean
}>()
</script>

<template>
  <div v-if="to" class="mb-[-2px]">
    <NuxtLink v-if="typeof to === 'string'" :to="to" :class="{ 'project-nav-item': true, active: active }" target="_blank">
      <slot></slot>
      <Icon name="dashicons:external" class="icon ml-1" />
    </NuxtLink>
    <NuxtLink v-else :to="to" :class="{ 'project-nav-item': true, active: active }">
      <slot></slot>
    </NuxtLink>
  </div>
</template>

<style scoped lang="scss">
.project-nav-item {
  @apply px-2 py-1 inline-flex items-center transition duration-300 border-b-2 border-transparent hover:border-[#004ee9];

  &.active {
    @apply border-[#004ee9] font-semibold;
  }
}
</style>
