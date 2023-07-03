export function useR2AssetPath(path: string): Ref<string | null> {
  return ref(`https://builds-r2.gzassets.net/${path}`)
}
