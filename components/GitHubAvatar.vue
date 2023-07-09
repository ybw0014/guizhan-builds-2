<script setup lang="ts">
const props = defineProps<{
  username: string
}>();

const imgSource = computed(() => `https://github.com/${props.username}.png`);
</script>

<template>
  <img :src="imgSource" class="rounded-md" :alt="username" />
</template>
