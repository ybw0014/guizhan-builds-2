<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from '@headlessui/vue';

const { t } = useI18n();

const props = defineProps<{
  disabled?: boolean;
  label?: string;
  filter: string;
  modelValue?: string;
  values: string[];
  i18n?: boolean;
}>();

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string): void;
}>();
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <RadioGroup v-model="value" class="flex flex-col gap-1">
    <RadioGroupLabel v-if="label" class="font-semibold mb-1">
      {{ label }}
      <UButton v-if="value" color="gray" size="sm" variant="link" :padded="false" @click="value = ''">
        {{ t("components.projectFilter.clear") }}
      </UButton>
    </RadioGroupLabel>
    <RadioGroupOption v-for="val in values" :key="val" v-slot="{ checked }" :value="val" class="filter-option flex gap-1 items-center cursor-pointer">
      <div :class="['filter-radio', checked ? 'checked' : '']">
        <UIcon name="i-mdi-circle" class="inner" />
      </div>
      <span>{{ i18n ? t(`filters.${filter}.${val}`) : val }}</span>
    </RadioGroupOption>
  </RadioGroup>
</template>

<style scoped lang="scss">
.filter-radio {
  @apply w-4 h-4 rounded-full transition-colors bg-gray-300 dark:bg-gray-600;

  & .inner {
    @apply absolute w-3 h-3 translate-x-0.5 translate-y-0.5 text-transparent;
  }

  &.checked {
    @apply bg-blue-500 #{!important};

    & .inner {
      @apply text-white;
    }
  }
}
.filter-option:hover .filter-radio {
  @apply bg-gray-400 dark:bg-gray-500;
}
</style>
