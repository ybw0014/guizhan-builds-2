import { Project, Projects, useParseProjects, BuildsInfo } from "guizhan-builds-2-data";
import { MinecraftVersionResponse } from "types/bmclApi";
import { OrderValidationResponse, DownloadResponse, LastUpdateResponse } from "types/sfSubscription";

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

export async function useMinecraftVersions(minimumVersion: string): Promise<Ref<string[] | null>> {
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

export async function useSubValidation(orderId: string): Promise<Ref<string | null>> {
  const { data } = await useExternalApi<OrderValidationResponse>(
    `https://afdian-validator.norain.city/validate/${orderId}`
  );
  useSubLog(`validation response: ${data.value}`);
  if (!data.value || data.value.code !== 200) {
    return ref(null);
  }
  return ref(data.value.data.uuid);
}

export async function useSubDownload(uuid: string): Promise<Ref<string | null>> {
  const { data } = await useExternalApi<DownloadResponse>(
    `https://afdian-validator.norain.city/download/${uuid}`
  );
  useSubLog(`validation response: ${data.value}`);
  if (!data.value || data.value.code !== 200) {
    return ref(null);
  }
  return ref(data.value.data);
}

export async function useSubLastUpdate(): Promise<Ref<number | null>> {
  const { data } = await useExternalApi<LastUpdateResponse>(
    "https://afdian-validator.norain.city/last_update"
  );
  useSubLog(`last update response: ${data.value}`);
  if (!data.value || data.value.code !== 200) {
    return ref(null);
  }
  return ref(data.value.data);
}
