export async function useLocalApi(key: string, path: string) {
  let host: string, protocol: string
  if (process.server) {
    host = useNuxtApp().ssrContext?.event.node.req.headers.host as string
    protocol = process.env.NODE_ENV === 'production' ? 'https:' : 'http:'
  } else {
    host = window.location.host
    protocol = window.location.protocol
  }
  return useAsyncData(key, () => $fetch(`${protocol}//${host}${path}`))
}

export async function useExternalApi(key: string, path: string) {
  return useAsyncData(key, () => $fetch(path))
}
