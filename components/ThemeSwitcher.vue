<script setup lang="ts">
const modes: Array<string> = ["system", "light", "dark"];
const icons: Record<string, string> = {
  system: "grommet-icons:system",
  light: "ph:sun-fill",
  dark: "ph:moon-stars-fill"
};

const { t } = useI18n();
const colorMode = useColorMode();

const pageLoaded = ref(false);
const currentMode = computed(() => colorMode.preference);
const currentIcon = computed(() => icons[currentMode.value]);
const nextMode = computed(() => modes[(modes.indexOf(currentMode.value) + 1) % modes.length]);
const modeTooltip = computed(() => {
  const current = currentMode.value;
  const next = nextMode.value;
  return t("components.header.theme-switcher.tooltip", {
    next: t(`components.header.theme-switcher.${next}`),
    current: t(`components.header.theme-switcher.${current}`)
  });
});

onMounted(() => {
  pageLoaded.value = true;
});

function switchThemePreference() {
  const next = nextMode.value;
  colorMode.preference = next;
}
</script>

<template>
  <a v-if="pageLoaded" href="javascript:void(0)" class="button link-box" :title="modeTooltip" @click="switchThemePreference">
    <Icon :name="currentIcon" class="icon" />
  </a>
</template>
