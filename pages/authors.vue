<script setup lang="ts">
import InputText from '~/components/ui/InputText.vue'
import { Project, Author } from 'guizhan-builds-data'
import { Header } from '~/types/dataTable'
import { useAuthors } from '~/composables/useAuthor'
import { watchDebounced } from '@vueuse/core'
import _ from 'lodash'

const { t } = useI18n()

const query = ref()
const projects = ref<Project[] | null>()
const authors = ref<Author[]>([])
const filteredList = ref<Author[]>([])

const p = await useProjects()
if (p) {
  projects.value = p
  authors.value = useAuthors(p)
  filterList()
}

const headers: Header[] = [
  {
    name: 'name',
    title: t('pages.authors.name'),
    sortable: true,
  },
  {
    name: 'projects',
    title: t('pages.authors.projects'),
    sortable: true,
  },
]

watchDebounced(
  query,
  () => {
    filteredList.value = []
    return filterList()
  },
  { deep: true, debounce: 250 }
)

function filterList() {
  let filtered: Author[] = authors.value
  if (query.value) {
    filtered = _.filter(authors.value, (author: Author) => {
      const q = query.value.toLowerCase()
      return _.includes(author.name.toLowerCase(), q)
    })
  }
  filteredList.value = filtered
}
</script>

<template>
  <Head>
    <Title>{{ t('pages.authors.title') }}</Title>
  </Head>
  <div class="flex flex-col gap-4">
    <PageTitle>{{ t('pages.authors.title') }}</PageTitle>
    <InputText v-model="query" :label="t('pages.authors.username')" />
    <DataTable :headers="headers" :items="filteredList" :sizePerPage="15">
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
