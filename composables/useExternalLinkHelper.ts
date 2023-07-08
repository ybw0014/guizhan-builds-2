import { RouteLocationRaw } from 'vue-router'
import { useSettingsStore } from '~/stores/useSettingsStore'

export function useExternalLinkHelper(to: RouteLocationRaw | string): RouteLocationRaw | string {
  if (typeof to !== 'string') {
    return to
  }
  const settingsStore = useSettingsStore()
  let host: string | null = null
  try {
    host = new URL(to).host
  } catch (ignored) {
    // ignored
  }

  if (host !== null && settingsStore.trustedHosts.includes(host)) {
    return to
  }

  return {
    name: 'external',
    query: {
      link: to
    }
  }
}
