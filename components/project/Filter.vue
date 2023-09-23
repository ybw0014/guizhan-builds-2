<script setup lang="ts">
import { RadioGroup, RadioGroupLabel, RadioGroupOption } from "@headlessui/vue";

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
  (e: "update:modelValue", value?: string): void;
}>();
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit("update:modelValue", val)
});
</script>

<template>
  <RadioGroup v-model="value" class="flex flex-col gap-1">
    <RadioGroupLabel v-if="label" class="font-semibold mb-1">
      {{ label }}
      <a v-if="value" href="javascript:void(0)" class="font-normal text-sm text-gray-500 dark:text-gray-400 hover:underline" @click="value = ''">
        {{ t("components.projectFilter.clear") }}
      </a>
    </RadioGroupLabel>
    <RadioGroupOption v-for="val in values" :key="val" v-slot="{ checked }" :value="val" class="filter-option flex gap-1 items-center cursor-pointer">
      <div :class="['filter-radio', checked ? 'checked' : '']">
        <Icon name="mdi:circle" class="inner" />
      </div>
      <span>{{ i18n ? t(`filters.${filter}.${val}`) : val }}</span>
    </RadioGroupOption>
  </RadioGroup>
</template>

<style scoped lang="scss">
.filter-radio {
  @apply w-4 h-4 rounded-full bg-gray-300 dark:bg-gray-600;

  & .inner {
    @apply absolute w-4 h-4 p-1 text-transparent;
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
