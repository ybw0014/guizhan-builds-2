import { Project, RawProject } from 'guizhan-builds-data'
import { MinecraftVersionResponse, MinecraftVersion } from '~/types/bmclApi'
import _ from 'lodash'

export async function useProjects(): Promise<Project[]> {
  const { data } = await useLocalApi('projects', '/repos.json')
  const rawProjects = data.value as RawProject[]
  const projects: Project[] = []
  _.forOwn(rawProjects, (rawProject, repoStr) => {
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
  })
  return projects
}

export async function useMinecraftVersions(minimumVersion: string): Promise<string[]> {
  const { data } = await useExternalApi('mcVersions', 'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json')
  const response = data.value as MinecraftVersionResponse
  const versions: string[] = []
  if (!response) {
    return versions
  }
  _.forOwn(response.versions, (v) => {
    const version = v as MinecraftVersion
    if (version.type !== 'release') {
      return true
    }
    versions.push(version.id)
    if (version.id === minimumVersion) {
      return false
    }
  })
  return versions
}
