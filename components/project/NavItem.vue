<script setup lang="ts">
/**
 * 此处链接必须使用点击事件 + router.push()，否则会出现路由参数丢失导致页面失效的问题
 */
import { RouteLocationRaw } from "vue-router";

const router = useRouter();

const props = withDefaults(defineProps<{
  to?: RouteLocationRaw;
  active?: boolean;
  external?: boolean;
}>(), {
  to: "/",
  active: false,
  external: false,
});

function navigate() {
  if (props.external) {
    window.open(props.to as string, "_blank", "noopener noreferrer");
  } else {
    router.push(props.to as RouteLocationRaw);
  }
}
</script>

<template>
  <div v-if="to" class="mb-[-2px]">
    <NuxtLink href="javascript:void(0)" :class="{ 'project-nav-item': true, active: active }" @click="navigate">
      <slot></slot>
      <Icon v-if="external" name="dashicons:external" class="icon ml-1" />
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
