<script setup lang="ts">
import _ from 'lodash'
const { t } = useI18n()

const props = withDefaults(
  defineProps<{
    requirements?: Record<string, Record<string, string>>
    vertical?: boolean
    title?: boolean
    text?: boolean
    size?: 'sm' | 'md' | 'lg' | 'xl'
  }>(),
  {
    title: false,
    text: false,
    size: 'md',
  }
)
const req = computed<Map<string, string>>(() => {
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

const requirementSize = computed(() => `text-${props.size}`)
const iconClass = computed(() => {
  switch (props.size) {
    case 'sm':
      return 'w-4 h-4'
    case 'md':
      return 'w-5 h-5'
    case 'lg':
      return 'w-6 h-6'
    case 'xl':
      return 'w-7 h-7'
  }
})
</script>

<template>
  <div v-if="req.size > 0" :class="{ 'project-requirements': true, vertical: props.vertical }">
    <div v-if="title" class="title">{{ t('components.projectRequirements.title') }}</div>
    <!-- java -->
    <div v-if="req.has('java')" :class="['requirement', requirementSize]">
      <span class="icon">
        <Icon name="mdi:language-java" :class="iconClass" title="Java" aria-label="Java" />
        <span v-if="text">Java</span>
      </span>
      <span>{{ req.get('java') }}</span>
    </div>
    <!-- minecraft -->
    <div v-if="req.has('minecraft')" :class="['requirement', requirementSize]">
      <span class="icon">
        <LazyLoadImage source="/images/minecraft.svg" :class="iconClass" title="Minecraft" aria-label="Minecraft" />
        <span v-if="text">Minecraft</span>
      </span>
      <span>{{ req.get('minecraft') }}</span>
    </div>
    <!-- paper -->
    <div v-if="req.has('paper')" :class="['requirement', requirementSize]">
      <span class="icon">
        <LazyLoadImage source="/images/paper-256x.webp" :class="iconClass" title="paper" aria-label="paper" />
        <span v-if="text">Paper</span>
      </span>
      <span>{{ t('components.projectRequirements.required') }}</span>
    </div>
    <!-- slimefun -->
    <div v-if="req.has('slimefun')" :class="['requirement', requirementSize]">
      <span class="icon">
        <Icon name="ph:package-light" :class="iconClass" title="Slimefun" aria-label="Slimefun" />
      </span>
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
    @apply text-gray-900 dark:text-gray-100 font-semibold;
  }

  .requirement {
    @apply inline-flex gap-1 items-center;

    .icon {
      @apply flex justify-center;
    }
  }
}
</style>
