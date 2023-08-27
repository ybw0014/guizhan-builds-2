<script setup lang="ts">
import { onKeyStroke } from "@vueuse/core";
const { t } = useI18n();
const props = defineProps<{
  page: number;
  pages: number;
}>();
const emit = defineEmits<{
  (e: "update:page", page: number): void;
}>();
const page = computed({
  get: () => props.page,
  set: (value) => emit("update:page", value)
});

function gotoPage(newPage: number) {
  page.value = newPage;
}

function visible(condition: boolean) {
  return condition ? "" : "visibility: hidden";
}

const pageOptions = computed(() => {
  const options = [];
  if (props.pages <= 5) {
    for (let i = 1; i <= props.pages; i++) {
      options.push(i);
    }
  } else {
    let low = page.value - 1;
    let high = page.value + 3;
    while (low < 1) {
      low++;
      high++;
    }
    while (high > props.pages) {
      low--;
      high--;
    }
    for (let i = low; i <= high; i++) {
      options.push(i);
    }
  }
  return options;
});

// 键盘控制
onKeyStroke(
  "ArrowLeft",
  (e) => {
    e.preventDefault();
    if (page.value > 1) {
      gotoPage(page.value - 1);
    }
  },
  { dedupe: false }
);
onKeyStroke(
  "ArrowRight",
  (e) => {
    e.preventDefault();
    if (page.value < props.pages) {
      gotoPage(page.value + 1);
    }
  },
  { dedupe: false }
);
</script>

<template>
  <div v-if="pages > 1" class="flex justify-center gap-2">
    <button class="pagination-button" :style="visible(page !== 1)" :disabled="page === 1" :aria-label="t('components.pagination.first')" @click="gotoPage(1)">
      <Icon name="ic:round-first-page" class="icon" />
    </button>

    <button
      class="pagination-button"
      :style="visible(page !== 1)"
      :disabled="page === 1"
      :aria-label="t('components.pagination.prev')"
      @click="gotoPage(page - 1)"
    >
      <Icon name="ic:baseline-chevron-left" class="icon" />
    </button>

    <button
      v-for="option in pageOptions"
      :key="option"
      class="pagination-button"
      :disabled="page === option"
      :aria-label="t('components.pagination.page', { page: option })"
      @click="gotoPage(option)"
    >
      {{ option }}
    </button>

    <button
      class="pagination-button"
      :style="visible(page !== pages)"
      :disabled="page === pages"
      :aria-label="t('components.pagination.next')"
      @click="gotoPage(page + 1)"
    >
      <Icon name="ic:baseline-chevron-right" class="icon" />
    </button>

    <button
      class="pagination-button"
      :style="visible(page !== pages)"
      :disabled="page === pages"
      :aria-label="t('components.pagination.last')"
      @click="gotoPage(pages)"
    >
      <Icon name="ic:round-last-page" class="icon" />
    </button>
  </div>
</template>

<style scoped lang="scss">
.pagination-button {
  @apply rounded-md bg-blue-500 hover:bg-blue-600 text-white py-0 px-2 align-middle cursor-pointer text-lg;

  &:disabled {
    @apply bg-gray-400 cursor-not-allowed;
  }

  &:has(.icon) {
    @apply px-1;
  }
}
</style>
