import type { RouteLocationRaw } from 'vue-router';
import { useSettingsStore } from '~/stores/useSettingsStore';

export function useDownloadHelper(url: URL, filename?: string) {
  const aLink = document.createElement('a');
  aLink.href = url.toString();
  aLink.target = '_blank';
  aLink.rel = 'noopener noreferrer';
  if (filename) {
    aLink.setAttribute('download', filename);
  }
  document.body.appendChild(aLink);
  aLink.click();
  document.body.removeChild(aLink);
}

export function useExternalLinkHelper(to: RouteLocationRaw | string): RouteLocationRaw | string {
  if (typeof to !== 'string') {
    return to;
  }
  const settingsStore = useSettingsStore();
  let host: string | null = null;
  try {
    host = new URL(to).host;
  } catch (ignored) {
    // ignored
  }

  if (host !== null && settingsStore.trustedHosts.includes(host)) {
    return to;
  }

  return {
    name: 'external',
    query: {
      link: to
    }
  };
}
