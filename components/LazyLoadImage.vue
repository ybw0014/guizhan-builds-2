<script setup lang="ts">
const props = withDefaults(
  defineProps<{
    source: string
    brokenImage?: string
  }>(),
  {
    source: '',
    brokenImage: '',
  }
)

const image = ref<HTMLImageElement>()
const isBroken = ref(false)
const retryTimes = ref(0)
const imgSource = computed(() => {
  return isBroken.value ? props.brokenImage : props.source
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
  retryTimes.value++
  if (retryTimes.value > 3) {
    return
  }
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
  <img ref="image" @error="handleBrokenImage" />

</template>
