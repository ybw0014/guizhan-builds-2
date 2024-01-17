export async function useLocalApi<T>(path: string) {
  let host: string, protocol: string;
  // 同时支持浏览器与SSR
  if (process.server) {
    host = useNuxtApp().ssrContext?.event.node.req.headers.host as string;
    protocol = process.env.NODE_ENV === 'production' ? 'https:' : 'http:';
  } else {
    host = window.location.host;
    protocol = window.location.protocol;
  }
  return useAsyncData<T>(path, () => $fetch(`${protocol}//${host}${path}`));
}

export async function useContentApi<T>(path: string) {
  return useAsyncData<T>(path, () => queryContent<T>(path).findOne());
}

export async function useExternalApi<T>(path: string) {
  return useAsyncData<T>(path, () => $fetch(path));
}

export async function useR2Asset<T>(path: string) {
  return await useExternalApi<T>(useR2AssetPath(path).value);
}
