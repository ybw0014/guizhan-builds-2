import { type Project, type Projects, type BuildsInfo, useParseProjects } from 'guizhan-builds-2-types';
import type { OrderValidationData, OrderValidationResponse, DownloadResponse, LastUpdateResponse, LastUpdateData } from '@/types/sfSubscription';

export async function useProjects(): Promise<Ref<Project[] | null>> {
  const { data } = await useContentApi<Projects>('repos');
  if (!data.value) {
    return ref(null);
  }
  return ref(useParseProjects(data.value));
}

export async function useBuilds(project: Project): Promise<Ref<BuildsInfo | null>> {
  const { data } = await useR2Asset<BuildsInfo>(`${project.author}/${project.repository}/${project.branch}/builds.json`);
  return data;
}

export async function useMinecraftVersions(): Promise<Ref<string[] | null>> {
  const { data } = await useContentApi<{ body: string[] }>('mc-versions');
  if (!data.value) {
    return ref(null);
  }
  return ref(data.value.body);
}

export async function useSubValidation(orderId: string): Promise<Ref<OrderValidationData | null>> {
  const { data } = await useExternalApi<OrderValidationResponse>(`/afdian-validator/validate/${orderId}`);
  useSubLog('validation response:');
  useSubLog(data.value);
  if (!data.value || data.value.code !== 200) {
    return ref(null);
  }
  return ref(data.value.data);
}

export async function useSubDownload(uuid: string): Promise<Ref<string | null>> {
  useSubLog(`download with uuid: ${uuid}`);
  const { data } = await useExternalApi<DownloadResponse>(`/afdian-validator/download/${uuid}`);
  useSubLog('download response:');
  useSubLog(data.value);
  if (!data.value || data.value.code !== 200) {
    return ref(null);
  }
  return ref(data.value.data);
}

export async function useSubLastUpdate(): Promise<Ref<LastUpdateData | null>> {
  const { data } = await useExternalApi<LastUpdateResponse>('/afdian-validator/last_update');
  useSubLog('last update response:');
  useSubLog(data.value);
  if (!data.value || data.value.code !== 200) {
    return ref(null);
  }
  return ref(data.value.data);
}
