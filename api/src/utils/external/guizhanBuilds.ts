import { requestJson } from '~/utils/request'
import { BuildsInfo, Projects, Project, useParseProjects, BuildInfo } from 'guizhan-builds-2-data'

export async function fetchProjects(): Promise<Project[]> {
  const rawProjects = await requestJson<Projects>(
    'https://raw.githubusercontent.com/ybw0014/guizhan-builds-2/master/public/repos.json'
  )
  return useParseProjects(rawProjects)
}

export async function fetchProject(author: string, repo: string, branch?: string): Promise<Project | undefined> {
  const projects = await fetchProjects()
  return projects.find(project => 
    project.author && project.repository && 
      project.author.toLocaleLowerCase() === author.toLocaleLowerCase() && 
      project.repository.toLocaleLowerCase() === repo.toLocaleLowerCase() 
      ? !branch || project.branch === branch : false
  )
}

export async function fetchBuilds(r2: R2Bucket, project: Project): Promise<BuildsInfo | null> {
  const file = await r2.get(`${project.author}/${project.repository}/${project.branch}/builds.json`)
  return await file.json<BuildsInfo>()
}

export async function fetchBuild(buildsInfo: BuildsInfo, build: string): Promise<BuildInfo | undefined> {
  const buildNum = build !== 'latest' ? parseInt(build) - 1 : buildsInfo.builds.length - 1
  return buildsInfo.builds[buildNum]
}
