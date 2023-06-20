<script setup lang="ts">
import { Author } from 'guizhan-builds-data'
import { RouteLocationRaw } from 'vue-router'
import _ from 'lodash'

const props = defineProps<{
  authors: string[] | string
}>()

const authors: ComputedRef<Author[]> = computed(() => {
  if (_.isArray(props.authors)) {
    const result: Author[] = []
    props.authors.forEach((author) => {
      result.push(getAuthor(author))
    })
    return result
  } else {
    return [getAuthor(props.authors)]
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
        name: name,
      },
    } as RouteLocationRaw,
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
