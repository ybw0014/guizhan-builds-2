export async function useApi(key: string, path: string) {
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
