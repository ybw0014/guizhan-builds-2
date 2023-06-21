<script setup lang="ts">
import _ from 'lodash'
const { t } = useI18n()

const props = defineProps<{
  requirements?: Record<string, Record<string, string>>
  vertical?: boolean
}>()
const req: ComputedRef<Map<string, string>> = computed(() => {
  const result: Map<string, string> = new Map()
  if (!props.requirements) {
    return result
  }
  for (const [key, value] of Object.entries(props.requirements)) {
    const latestVer = _.max(Object.keys(value)) || 1
    result.set(key, value[latestVer])
  }
  return result
})
</script>

<template>
  <div v-if="req.size > 0" :class="{ 'project-requirements': true, vertical: props.vertical }">
    <div class="title">{{ t('components.projectRequirements.title') }}</div>
    <!-- java -->
    <div v-if="req.has('java')" class="requirement">
      <span class="icon" aria-label="Java"><Icon name="mdi:language-java" /></span>
      <span>{{ req.get('java') }}</span>
    </div>
    <!-- minecraft -->
    <div v-if="req.has('minecraft')" class="requirement">
      <span class="icon" aria-label="Minecraft"><Icon name="arcticons:minecraft" /></span>
      <span>{{ req.get('minecraft') }}</span>
    </div>
    <!-- slimefun -->
    <div v-if="req.has('slimefun')" class="requirement">
      <span class="icon" aria-label="Slimefun"><Icon name="ph:package-light" /></span>
      <span>{{ req.get('slimefun') }}</span>
    </div>
  </div>
</template>

<style scoped lang="scss">
.project-requirements {
  @apply flex text-gray-500 dark:text-gray-200 gap-2;

  &.vertical {
    @apply flex-col gap-0;
  }

  .title {
    @apply text-gray-900 dark:text-gray-100 font-semibold text-sm;
  }

  .requirement {
    @apply inline-flex gap-1 text-sm;

    .icon {
      @apply flex flex-col justify-center text-xl;
    }
  }
}
</style>
