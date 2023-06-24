import { Project, RawProject, Author } from 'guizhan-builds-data'
import { MinecraftVersionResponse, MinecraftVersion } from '~/types/bmclApi'
import _ from 'lodash'

export async function useProjects(): Promise<Ref<Project[] | null>> {
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
  return ref(projects)
}

export async function useAuthors(): Promise<Ref<Author[] | null>> {
  const projects = await useProjects()
  const authors: Map<string, Author> = new Map()
  if (!projects.value) {
    return ref(null)
  }
  projects.value.forEach((project) => {
    if (!authors.has(project.author)) {
      authors.set(project.author, useAuthor(project.author, 1))
    } else {
      const author = authors.get(project.author) as Author
      author.projects++
    }
    if (project.displayOptions?.authors) {
      project.displayOptions.authors.forEach((author) => {
        if (!authors.has(author)) {
          authors.set(author, useAuthor(author, 1))
        } else {
          const author1 = authors.get(author) as Author
          author1.projects++
        }
      })
    }
  })
  return ref(Array.from(authors.values()))
}

export async function useAuthorProjects(author: string): Promise<Ref<Project[] | null>> {
  const projects = await useProjects()
  if (!projects.value) {
    return ref(null)
  }
  return ref(
    projects.value.filter((project) => {
      if (project.author == author) {
        return true
      }
      if (project.displayOptions?.authors) {
        return project.displayOptions.authors.includes(author)
      }
      return false
    })
  )
}

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

export async function useMinecraftVersions(minimumVersion: string): Promise<Ref<string[]>> {
  const { data } = await useExternalApi('mcVersions', 'https://bmclapi2.bangbang93.com/mc/game/version_manifest_v2.json')
  const response = data.value as MinecraftVersionResponse
  const versions: string[] = []
  if (!response) {
    return ref(versions)
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
  return ref(versions)
}
