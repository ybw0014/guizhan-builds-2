<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { Project } from 'guizhan-builds-data'
import { watchDebounced } from '@vueuse/core'
import _ from 'lodash'

const { t } = useI18n()
const route = useRoute()
const router = useRouter()

const query = ref<string>((route.query.q as string) || '')
const sortTypes = computed(() => [
  { id: 'name', label: t('sortTypes.name') },
  { id: 'newest', label: t('sortTypes.newest') },
])
const activeSortType = ref<string>((route.query.sortBy as string) || sortTypes.value[0].id)
const page = ref(route.query.page ? Number(route.query.page) : 1)
const filteredList = ref<Project[] | null>()
const projectList = ref<Element | null>(null)
const pageResetAnchor = ref<Element | null>(null)
const projects = await useProjects()

filterList()

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
    <Title>{{ t('pages.projects.title') }}</Title>
  </Head>
  <div class="flex flex-col gap-4 items-center">
    <h1 ref="pageResetAnchor" class="text-3xl font-bold mt-4">{{ t('pages.projects.title') }}</h1>
    <h2 class="text-xl">{{ t('pages.projects.subTitle') }}</h2>
    <!-- 搜索框 -->
    <div class="relative rounded-md flex shadow-md w-full max-w-screen-md">
      <!-- 输入 -->
      <input v-model="query" class="query-input" type="text" :placeholder="t('pages.projects.query', [projects?.length])" />
      <!-- 小屏幕排序方式 -->
      <Menu as="div" class="md:hidden relative flex">
        <MenuButton class="query-sort">
          <Icon name="ic:round-sort" class="text-xl pointer-events-none" />
        </MenuButton>
        <transition name="dropdown-menu">
          <MenuItems class="menu-items bg-default top-14 right-0">
            <MenuItem v-for="sortType in sortTypes" :key="sortType.id">
              <a
                href="javascript:void(0)"
                :class="{
                  'menu-item link-box': true,
                  active: activeSortType === sortType.id,
                }"
                class="px-4 py-2 text-left"
                @click="activeSortType = sortType.id"
              >
                {{ sortType.label }}
              </a>
            </MenuItem>
          </MenuItems>
        </transition>
      </Menu>
    </div>
    <!-- 大屏幕排序方式 -->
    <div class="justify-center md:flex gap-2 hidden">
      <a
        v-for="sortType in sortTypes"
        :key="sortType.id"
        href="javascript:void(0)"
        :class="{ 'link-box sort-type': true, active: activeSortType === sortType.id }"
        @click="activeSortType = sortType.id"
      >
        {{ sortType.label }}
      </a>
    </div>
  </div>
  <div class="flex items-start justify-center mt-4">
    <!-- 项目列表 -->
    <div v-if="filteredList" class="w-full max-w-4xl min-w-0 mb-5 flex flex-col gap-2 lg:mb-0">
      <ProjectList ref="projectList" :projects="filteredList" :page="page" @update:page="updatePage" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.query-input {
  @apply rounded-l-md md:rounded-md p-4 basis-full min-w-0 border-none dark:bg-gray-700;
}
.query-sort {
  @apply bg-blue-500 text-white rounded-r-md px-2;
}

.sort-type {
  @apply px-4 py-2 rounded-md;
}
</style>
