export function useR2AssetPath(path: string): Ref<string> {
  return ref(new URL(path, "https://builds-r2.gzassets.net/").toString());
}
