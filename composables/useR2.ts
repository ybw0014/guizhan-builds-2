
export function useR2AssetPath(path: string): Ref<string> {
  return ref("/r2/" + path);
}
