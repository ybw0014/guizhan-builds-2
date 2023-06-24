<script setup lang="ts">
import { RouteLocationRaw } from 'vue-router'

defineProps<{
  to?: RouteLocationRaw
  href?: string
  active?: boolean
}>()

const router = useRouter()
</script>

<template>
  <div v-if="to || href" class="mb-[-2px]">
    <a v-if="to" href="javascript:void(0)" @click="router.push(to)" :class="{ 'project-nav-item': true, active: active }">
      <slot></slot>
    </a>
    <a v-else-if="href" :href="href" :class="{ 'project-nav-item': true, active: active }" target="_blank">
      <slot></slot>
      <Icon name="dashicons:external" class="icon ml-1" />
    </a>
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
