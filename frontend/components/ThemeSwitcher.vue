<script setup lang="ts">
const modes = ['system', 'light', 'dark'];
const icons: Record<string, string> = {
  system: 'i-heroicons-computer-desktop',
  light: 'i-mdi-weather-sunny',
  dark: 'i-mdi-weather-night'
};

const { t } = useI18n();
const colorMode = useColorMode();

const currentMode = computed(() => colorMode.preference);
const currentIcon = computed(() => icons[currentMode.value]);
const nextMode = computed(() => modes[(modes.indexOf(currentMode.value) + 1) % modes.length]);
const modeTooltip = computed(() => {
  const current = currentMode.value;
  const next = nextMode.value;
  return t('components.header.theme-switcher.tooltip', {
    next: t(`components.header.theme-switcher.${next}`),
    current: t(`components.header.theme-switcher.${current}`)
  });
});

function switchThemePreference() {
  colorMode.preference = nextMode.value;
}
</script>

<template>
  <ClientOnly>
    <a href="javascript:void(0)" class="button link-box" :title="modeTooltip" @click="switchThemePreference">
      <UIcon :name="currentIcon" class="icon" />
    </a>
  </ClientOnly>
</template>
