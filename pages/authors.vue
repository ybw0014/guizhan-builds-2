<script setup lang="ts">
import InputText from '~/components/ui/InputText.vue'
import { Project, Author } from 'guizhan-builds-data'
import { Header } from '~/types/dataTable'
import { useAuthor } from '~/composables/useAuthor'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const query = ref()
const projects = ref<Project[] | null>()

const p = await useProjects()
if (p) {
  projects.value = p
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

const authors = computed(() => {
  if (!projects.value) {
    return
  }
  const authors: Map<string, Author> = new Map()
  projects.value.forEach((project) => {
    if (!authors.has(project.author)) {
      authors.set(project.author, useAuthor(project.author, 1))
    } else {
      const author = authors.get(project.author) as Author
      author.projects++
    }
    if (project.displayOptions?.authors) {
      project.displayOptions.authors.forEach((author) => {
        if (!authors.has(author)) {
          authors.set(author, useAuthor(author, 1))
        } else {
          const author1 = authors.get(author) as Author
          author1.projects++
        }
      })
    }
  })
  return Array.from(authors.values())
})
</script>

<template>
  <Head>
    <Title>{{ t('pages.authors.title') }}</Title>
  </Head>
  <div class="flex flex-col gap-4">
    <PageTitle>{{ t('pages.authors.title') }}</PageTitle>
    <InputText v-model="query" :label="t('pages.authors.username')" />
    <DataTable :headers="headers" :items="authors" :sizePerPage="15">
      <template #col-name="{ item }">
        <NuxtLink :to="item.href" class="author-link" :target="item.target">
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
