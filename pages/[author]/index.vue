<script setup lang="ts">
import { Project } from 'guizhan-builds-data'
import { watchDebounced } from '@vueuse/core'
import InputText from '~/components/ui/InputText.vue'
import InputSelect from '~/components/ui/InputSelect.vue'
import _ from 'lodash'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const author = ref<string>(route.params.author as string)
const query = ref()
const sortTypes = computed(() => [
  { id: 'name', label: t('sortTypes.name') },
  { id: 'newest', label: t('sortTypes.newest') },
])
const activeSortType = ref<string>((route.query.sortBy as string) || sortTypes.value[0].id)
const page = ref(route.query.page ? Number(route.query.page) : 1)
const projects = ref<Project[] | null>()
const filteredList = ref<Project[] | null>()
const pageResetAnchor = ref<Element | null>(null)

const p = await useProjects()
if (p) {
  const authorProjects = p.filter((project) => {
    if (project.author == author.value) {
      return true
    }
    if (project.displayOptions?.authors) {
      return project.displayOptions.authors.includes(author.value)
    }
    return false
  })
  if (authorProjects.length == 0) {
    throw createError({ statusCode: 404, statusMessage: 'Page Not Found' })
  } else {
    projects.value = authorProjects
    filterList()
  }
}

const queryParams = computed(() => {
  const params: Record<string, any> = {}
  if (query.value) {
    params.q = query.value
  }
  if (activeSortType.value) {
    params.sortBy = activeSortType.value
  }
  if (page.value > 1) {
    params.page = page.value
  }
  return params
})

watchDebounced(
  queryParams,
  async () => {
    filteredList.value = null
    await router.replace({ query: queryParams.value })
    return filterList()
  },
  { deep: true, debounce: 250 }
)

function updatePage(newPage: number) {
  if (page.value === newPage) {
    return
  }
  page.value = newPage
  if (process.client && pageResetAnchor.value) {
    window.scrollBy(0, pageResetAnchor.value.getBoundingClientRect().y)
  }
}

function filterList() {
  if (!projects.value) {
    return
  }
  let filtered: Project[] = _.filter(projects.value, (project: Project) => !project.displayOptions?.hidden)
  if (query.value) {
    filtered = _.filter(projects.value, (project: Project) => {
      const q = query.value.toLowerCase()
      return (project.repository.toLowerCase().includes(q) ||
        project.displayOptions?.keywords?.some((keyword: string) => keyword.toLowerCase().includes(q))) as boolean
    })
  }
  switch (activeSortType.value) {
    case 'name':
      filtered = _.sortBy(filtered, (project: Project) => project.repository.toLowerCase())
      break
    case 'newest':
      filtered = _.cloneDeep(filtered).reverse()
      break
  }
  filteredList.value = filtered
}
</script>

<template>
  <Head>
    <Title>{{ t('pages.author.title', { author }) }}</Title>
  </Head>
  <div class="flex flex-col items-center">
    <div class="flex flex-col gap-4 w-full max-w-4xl">
      <div ref="pageResetAnchor" class="card bg-default author-card">
        <GitHubAvatar :username="author" class="w-24 h-24" />
        <div class="flex flex-col">
          <div class="author-name">{{ author }}</div>
          <div class="author-links">
            <NuxtLink :to="`https://github.com/${author}`" target="_blank">
              <Icon name="mdi:github" class="w-6 h-6" />
            </NuxtLink>
          </div>
        </div>
        <div class="grow"></div>
        <div class="flex flex-col">
          {{ t('pages.author.numProjects', { num: projects?.length || 0 }) }}
        </div>
      </div>
      <hr class="w-full my-1 border-gray-400 dark:border-gray-500" />
      <div class="flex gap-4">
        <InputText v-model="query" :label="t('pages.author.searchName')" />
        <InputSelect v-model="activeSortType" :values="sortTypes" item-text="label" item-value="id" :label="t('pages.author.sortBy')" />
      </div>
      <div v-if="filteredList" class="min-w-0 mb-5 flex flex-col gap-2 lg:mb-0">
        <ProjectList ref="projectList" :projects="filteredList" :page="page" @update:page="updatePage" />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.author-card {
  @apply max-w-4xl flex flex-row gap-4 border-t-4 border-blue-500;
}
.author-name {
  @apply text-xl;
}
.author-links a {
  @apply hover:text-blue-600 dark:hover:text-blue-400;
}
</style>
