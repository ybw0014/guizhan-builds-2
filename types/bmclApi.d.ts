export interface LatestVersions {
  release: string;
  snapshot: string;
}

export interface MinecraftVersion {
  id: string;
  type: "release" | "snapshot";
  url: string;
  time: string;
  releaseTime: string;
  sha1: string;
  complianceLevel: number;
}

export interface MinecraftVersionResponse {
  latest: LatestVersions;
  versions: MinecraftVersion[];
}
