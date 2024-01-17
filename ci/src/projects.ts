/**
 * 项目列表(repos.json)相关
 *
 * repos.json文件存储于前端仓库
 */
import { Project, Projects, useParseProjects } from 'guizhan-builds-2-data'
import { request } from '@/request'

export async function getProjects(): Promise<Project[]> {
  const projects: Project[] = []
  try {
    const { data: rawProjects } = await request.get<Projects>(
      `https://raw.githubusercontent.com/ybw0014/guizhan-builds-2-frontend/master/frontend/public/repos.json?t=${new Date().getTime()}`
    )
    return useParseProjects(rawProjects)
  } catch (err) {
    console.error('> 获取项目列表失败')
    return projects
  }
}
