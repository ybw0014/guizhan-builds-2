<script setup lang="ts">
const modes: Array<string> = ['system', 'light', 'dark']
const icons: Record<string, string> = {
  system: 'grommet-icons:system',
  light: 'ph:sun-fill',
  dark: 'ph:moon-stars-fill',
}

const { t } = useI18n()
const colorMode = useColorMode()

const currentMode = ref(colorMode.preference)
const pageLoaded = ref(false)
const currentIcon = computed(() => icons[currentMode.value])
const nextMode = computed(() => modes[(modes.indexOf(currentMode.value) + 1) % modes.length])
const modeTooltip = computed(() => {
  const current = currentMode.value
  const next = nextMode.value
  return t('header.theme-switcher.tooltip', {
    next: t(`header.theme-switcher.${next}`),
    current: t(`header.theme-switcher.${current}`),
  })
})

onMounted(() => {
  pageLoaded.value = true
})

function switchThemePreference() {
  const next = nextMode.value
  currentMode.value = next
  colorMode.preference = next
}
</script>

<template>
  <a href="javascript:void(0)" @click="switchThemePreference" class="button link-box" :title="modeTooltip" v-if="pageLoaded">
    <Icon :name="currentIcon" class="icon" />
  </a>
</template>
