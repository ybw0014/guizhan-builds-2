<script setup lang="ts">
import { Project, Author } from 'guizhan-builds-data'
import { RouteLocationRaw } from 'vue-router'
import _ from 'lodash'

const props = defineProps<{
  project: Project
}>()

const authors: ComputedRef<Author[]> = computed(() => {
  const authors = props.project.displayOptions?.author || props.project.author
  if (_.isArray(authors)) {
    const result: Author[] = []
    authors.forEach((author) => {
      result.push(getAuthor(author))
    })
    return result
  } else {
    return [getAuthor(authors)]
  }
})

function getAuthor(author: string): Author {
  if (author.startsWith('@')) {
    // 指向作者 GitHub 页面
    return getGitHubAuthor(author)
  } else {
    // 指向作者站内页面
    return getLocalAuthor(author)
  }
}

function getGitHubAuthor(name: string): Author {
  const author = name.slice(1)
  return {
    name: author,
    href: `https://github.com/${author}`,
    target: '_blank',
  }
}

function getLocalAuthor(name: string): Author {
  return {
    name: name,
    href: {
      name: 'author',
      params: {
        author: name,
      },
    } as RouteLocationRaw,
    target: '_self',
  }
}
</script>

<template>
  <div>
    <span v-for="(author, index) in authors" :key="author.name">
      <NuxtLink :to="author.href" class="author-link" :target="author.target">
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
