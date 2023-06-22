<script setup lang="ts">
import { Project, Author } from 'guizhan-builds-data'
import { useAuthor } from '~/composables/useAuthor'
import _ from 'lodash'

const props = defineProps<{
  project: Project
}>()

const authors: ComputedRef<Author[]> = computed(() => {
  const authors = props.project.displayOptions?.authors || props.project.author
  if (_.isArray(authors)) {
    const result: Author[] = []
    authors.forEach((author) => {
      result.push(useAuthor(author))
    })
    return result
  } else {
    return [useAuthor(authors)]
  }
})
</script>

<template>
  <div>
    <span v-for="(author, index) in authors" :key="author.name">
      <NuxtLink :to="{ name: 'author', params: { author: author.name } }" class="author-link">
        {{ author.name }}
      </NuxtLink>
      <span v-if="index + 1 < authors.length">, </span>
    </span>
  </div>
</template>

<style scoped lang="scss">
.author-link {
  @apply text-blue-500 hover:underline;
}
</style>
