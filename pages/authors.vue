<script setup lang="ts">
import { Author } from 'guizhan-builds-2-data-extra';
import { watchDebounced } from '@vueuse/core';
import _ from 'lodash';
import { Header } from '~/types/dataTable';

const { t } = useI18n();

const query = ref();
const filteredList = ref<Author[]>([]);
const authors = await useAuthorList();

filterList();

const headers: Header[] = [
  {
    name: 'name',
    title: t('pages.authors.name'),
    sortable: true
  },
  {
    name: 'projects',
    title: t('pages.authors.projects'),
    sortable: true
  }
];

watchDebounced(
  query,
  () => {
    filteredList.value = [];
    return filterList();
  },
  { deep: true, debounce: 250 }
);

function filterList() {
  if (!authors.value) {
    return;
  }
  let filtered: Author[] = authors.value;
  if (query.value) {
    filtered = _.filter(authors.value, (author: Author) => {
      const q = query.value.toLowerCase();
      return _.includes(author.name.toLowerCase(), q);
    });
  }
  filteredList.value = filtered;
}
</script>

<template>
  <Head>
    <Title>{{ t("pages.authors.title") }}</Title>
  </Head>
  <div class="flex flex-col gap-4">
    <PageTitle>{{ t("pages.authors.title") }}</PageTitle>
    <UiInputText v-model="query" :label="t('pages.authors.username')" />
    <DataTable :headers="headers" :items="filteredList" :size-per-page="15">
      <template #col-name="{ item }">
        <NuxtLink :to="{ name: 'author', params: { author: item.name } }" class="author-link">
          {{ item.name }}
        </NuxtLink>
      </template>
    </DataTable>
  </div>
</template>

<style scoped lang="scss">
.author-link {
  @apply text-blue-600 hover:underline;
}
</style>
