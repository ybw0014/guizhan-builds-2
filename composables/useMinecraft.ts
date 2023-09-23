import { MinecraftVersionString } from "guizhan-builds-2-data-extra";

const mcVersionRegExp = /^1\.(\d+)(?:\.(\d+))?$/;

export function useMinecraftVersion(version: string): Ref<MinecraftVersionString | null> {
  if (!mcVersionRegExp.test(version)) {
    // 不是mc版本号
    return ref(null);
  }
  const match = version.match(mcVersionRegExp);
  if (!match) {
    return ref(null);
  }

  return ref({
    major: parseInt(match[1]),
    minor: parseInt(match[2] || "0"),
  } as MinecraftVersionString);
}

export function useMcVersionAtLeast(current: string, required: string): boolean {
  const currentVersion = useMinecraftVersion(current);
  const requiredVersion = useMinecraftVersion(required);
  if (currentVersion.value === null || requiredVersion.value === null) {
    return false;
  }
  if (currentVersion.value.major > requiredVersion.value.major) {
    return true;
  } else if (currentVersion.value.major < requiredVersion.value.major) {
    return false;
  } else {
    return currentVersion.value.minor >= requiredVersion.value.minor;
  }
}
