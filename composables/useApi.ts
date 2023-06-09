export async function useLocalApi<T>(path: string) {
  let host: string, protocol: string;
  if (process.server) {
    host = useNuxtApp().ssrContext?.event.node.req.headers.host as string;
    protocol = process.env.NODE_ENV === "production" ? "https:" : "http:";
  } else {
    host = window.location.host;
    protocol = window.location.protocol;
  }
  return useFetch<T>(`${protocol}//${host}${path}`);
}

export async function useContentApi<T>(path: string) {
  return useAsyncData<T>(path, () => queryContent<T>(path).findOne());
}

export async function useExternalApi<T>(path: string) {
  return useFetch<T>(path);
}

export async function useR2Asset<T>(path: string) {
  return useFetch<T>(useR2AssetPath(path).value);
}
