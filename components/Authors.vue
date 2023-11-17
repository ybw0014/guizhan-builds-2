<script setup lang="ts">
import type { Project } from 'guizhan-builds-2-data';

const props = defineProps<{
  project: Project;
}>();

const authors = await useProjectAuthors(props.project);
</script>

<template>
  <div v-if="authors">
    <span v-for="(author, index) in authors" :key="author.name">
      <NuxtLink :to="{ name: 'author', params: { author: author.name } }" class="a-link" @click.stop>
        {{ author.name }}
      </NuxtLink>
      <span v-if="index + 1 < authors.length">, </span>
    </span>
  </div>
</template>
