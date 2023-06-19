import { Project, RawProject } from 'guizhan-builds-data'
import _ from 'lodash'

export async function useProjects(): Promise<Project[]> {
  const { data } = await useApi('projects', '/repos.json')
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
