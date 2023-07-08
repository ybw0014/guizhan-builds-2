<script setup lang="ts" generic="T extends Record<string, any>">
import { Header } from '~/types/dataTable'
const props = withDefaults(
  defineProps<{
    headers: Header[]
    items?: T[]
    sizePerPage?: number
    initSort?: string
  }>(),
  {
    initSort: '',
    sizePerPage: 10
  }
)

const sliced = ref<T[]>()
const page = ref(1)
const activeSorter = ref<string>(props.initSort)
const activeSortCol = computed(() => {
  if (activeSorter.value.startsWith('-')) {
    return activeSorter.value.substring(1)
  } else {
    return activeSorter.value
  }
})
const activeSortOrder = computed(() => {
  if (!activeSorter.value) {
    return 0
  } else {
    return activeSorter.value.startsWith('-') ? -1 : 1
  }
})
const totalPages = computed(() => {
  if (!sorted.value) {
    return 0
  }
  return Math.ceil(sorted.value.length / props.sizePerPage)
})
const sorted = computed<T[]>(() => {
  if (!props.items) {
    return []
  }
  return [...props.items].sort((a, b) => {
    if (activeSortOrder.value === 0) return 0
    const field = activeSortCol.value
    if (a[field] > b[field]) return -activeSortOrder.value
    if (a[field] < b[field]) return activeSortOrder.value
    return 0
  })
})

onMounted(() => {
  calcSliced()
})
watch(sorted, calcSliced)
watch(page, calcSliced)

function sort(header: Header) {
  if (!header.sortable) {
    return
  }
  if (activeSortCol.value === header.name) {
    if (activeSortOrder.value === 1) {
      activeSorter.value = `-${header.name}`
    } else {
      activeSorter.value = ''
    }
  } else {
    activeSorter.value = header.name
  }
}

function recalcPage() {
  if (totalPages.value === 0) {
    return
  }
  if (page.value > totalPages.value) {
    page.value = totalPages.value
  }
  if (page.value < 1) {
    page.value = 1
  }
}

function calcSliced() {
  if (!sorted.value) {
    return
  }
  recalcPage()
  const start = (page.value - 1) * props.sizePerPage
  const end = start + props.sizePerPage
  sliced.value = sorted.value.slice(start, end)
}

function updatePage(newPage: number) {
  page.value = newPage
}
</script>

<template>
  <table class="data-table">
    <thead>
      <tr>
        <th v-for="header in headers" :key="header.name" @click="sort(header)">
          {{ header.title }}
          <span v-if="header.sortable" class="ml-1">
            <Icon name="iconoir:sort" v-if="activeSortCol !== header.name" />
            <span v-else>
              <Icon name="iconoir:sort-down" v-if="activeSortOrder === 1" />
              <Icon name="iconoir:sort-up" v-else />
            </span>
          </span>
        </th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="item in sliced" :key="item.name">
        <td v-for="header in headers" :key="header.name">
          <slot :name="`col-${header.name}`" :item="item">{{ item[header.name] }}</slot>
        </td>
      </tr>
    </tbody>
  </table>
  <PaginationButtons v-show="sliced" :page="page" :pages="totalPages" @update:page="updatePage" />
</template>

<style scoped lang="scss">
.data-table {
  @apply w-full;

  tr {
    @apply border-b border-gray-300 dark:border-gray-500;
  }

  thead {
    th {
      @apply text-left py-2 px-4 font-bold cursor-pointer;
    }
  }

  tbody {
    td {
      @apply py-2 px-4;
    }
  }
}
</style>
