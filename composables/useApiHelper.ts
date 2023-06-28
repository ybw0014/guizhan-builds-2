import { Project, RawProject } from 'guizhan-builds-data'
import { MinecraftVersionResponse } from '~/types/bmclApi'

export async function useProjects(): Promise<Ref<Project[] | null>> {
  const { data } = await useLocalApi<Record<string, RawProject>>('/repos.json')
  const projects: Project[] = []
  if (!data.value) {
    return ref(null)
  }
  for (const repoStr in data.value) {
    const rawProject = data.value[repoStr]
    const [author, repoNBranch] = repoStr.split('/')
    const [repository, branch] = repoNBranch.split(':')
    const project: Project = {
      key: repoStr,
      author,
      repository,
      branch,
      ...(rawProject as RawProject),
    }
    projects.push(project)
  }
  return ref(projects)
}

export async function useMinecraftVersions(minimumVersion: string): Promise<Ref<string[]>> {
  const { data } = await useExternalApi<MinecraftVersionResponse>(
    'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json'
  )
  const response = data.value
  const versions: string[] = []
  if (!response) {
    return ref(versions)
  }
  for (let i = 0; i < response.versions.length; i++) {
    const version = response.versions[i]
    if (version.type !== 'release') {
      continue
    }
    versions.push(version.id)
    if (version.id === minimumVersion) {
      break
    }
  }
  return ref(versions)
}
