import { Project } from 'guizhan-builds-data'
import _ from 'lodash'

export async function useProjectRepository(author: string, repository: string): Promise<Ref<Project[] | null>> {
  const projects = await useProjects()
  if (!projects.value) {
    return ref(null)
  }
  return ref(projects.value.filter((project) => project.author === author && project.repository === repository))
}

export async function useProject(author: string, repository: string, branch: string): Promise<Ref<Project | null>> {
  const projects = await useProjects()
  if (!projects.value) {
    return ref(null)
  }
  return ref(
    projects.value.find((p) => {
      if (p.author === author && p.repository === repository && p.branch === branch) {
        return true
      }
      if (_.isArray(p.alias)) {
        return p.alias.find((alias: string) => `${author}/${repository}:${branch}` === alias)
      }
      return false
    }) || null
  )
}
