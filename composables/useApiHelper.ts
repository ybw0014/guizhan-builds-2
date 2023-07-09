import { Project, Projects, useParseProjects, BuildsInfo } from "guizhan-builds-2-data";
import { MinecraftVersionResponse } from "~/types/bmclApi";

export async function useProjects(): Promise<Ref<Project[] | null>> {
  const { data } = await useLocalApi<Projects>("/repos.json");
  if (!data.value) {
    return ref(null);
  }
  return ref(useParseProjects(data.value));
}

export async function useBuilds(project: Project): Promise<Ref<BuildsInfo | null>> {
  const { data } = await useR2Asset<BuildsInfo>(`${project.author}/${project.repository}/${project.branch}/builds.json`);
  return data;
}

export async function useMinecraftVersions(minimumVersion: string): Promise<Ref<string[]>> {
  const { data } = await useExternalApi<MinecraftVersionResponse>(
    "https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json"
  );
  const response = data.value;
  const versions: string[] = [];
  if (!response) {
    return ref(versions);
  }
  for (let i = 0; i < response.versions.length; i++) {
    const version = response.versions[i];
    if (version.type !== "release") {
      continue;
    }
    versions.push(version.id);
    if (version.id === minimumVersion) {
      break;
    }
  }
  return ref(versions);
}
