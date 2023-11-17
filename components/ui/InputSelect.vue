<script setup lang="ts">
import { Option } from '~/types/components/ui/InputSelect';

const { t } = useI18n();

const props = withDefaults(
  defineProps<{
    disabled?: boolean;
    label?: string;
    modelValue?: string | null;
    values: Option[] | Record<string, any> | string[] | object[];
    itemValue?: string;
    itemText?: string;
    i18nText?: boolean;
  }>(),
  {
    label: '',
    modelValue: '',
    itemValue: 'value',
    itemText: 'text',
    i18nText: false
  }
);

const emit = defineEmits<{
  (e: 'update:modelValue', value?: string | null): void;
}>();
const value = computed({
  get: () => props.modelValue,
  set: (val) => emit('update:modelValue', val)
});
</script>

<template>
  <UiInputWrapper :value="value" :label="label" :disabled="disabled">
    <select v-model="value" :disabled="disabled" class="input-select">
      <option
        v-for="val in values"
        :key="val[itemValue] || val"
        :value="val[itemValue] || val"
        class="dark:bg-[#191e28]"
        :selected="value === val[itemValue] || value === val"
      >
        {{ props.i18nText ? t(val[itemText] || val) : val[itemText] || val }}
      </option>
    </select>
    <Icon name="mdi:menu-down" class="absolute flex right-2 self-center" />
  </UiInputWrapper>
</template>

<style scoped lang="scss">
.input-select {
  @apply outline-none flex-grow appearance-none bg-transparent w-full py-0.5 border-none text-black dark:text-white;
}
</style>
