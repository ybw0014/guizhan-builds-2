<script setup lang="ts">
import { Project } from 'guizhan-builds-data'

const props = defineProps<{
  project: Project
}>()

const image = ref<HTMLImageElement>()
const isBroken = ref(false)
const imgSource = computed(() => {
  if (isBroken.value) {
    return '/images/default_badge.svg'
  }
  const { project } = props
  let dir = project.buildOptions?.customDir
  if (!dir) {
    dir = `${project.author}/${project.repository}/${project.branch}`
  }
  return `/f/${dir}/badge.svg`
})

onMounted(() => {
  if (process.client) {
    if (window['IntersectionObserver']) {
      createObserver()
    } else {
      loadImage()
    }
  }
})

function handleBrokenImage() {
  isBroken.value = true
  loadImage()
}

function createObserver() {
  const img = image.value
  if (!img) {
    return
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        loadImage()
        observer.unobserve(img)
      }
    })
  })
  observer.observe(img)
}

function loadImage() {
  const img = image.value
  if (!img) {
    return
  }
  img.src = imgSource.value
}
</script>

<template>
  <img ref="image" @error="handleBrokenImage" class="w-[110px] h-[26px]" />
</template>
