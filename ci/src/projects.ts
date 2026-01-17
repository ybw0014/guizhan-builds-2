/**
 * 项目列表(repos.json)相关
 *
 * repos.json文件存储于前端仓库
 */
import { Project, Projects, useParseProjects } from 'guizhan-builds-2-types'
import { request } from '@/request'
import { Logger } from '@/utils/Logger'

const logger = new Logger('projects')

export async function getProjects(): Promise<Project[]> {
  try {
    const { data: rawProjects } = await request.get<Projects>(
      // eslint-disable-next-line max-len
      `https://raw.githubusercontent.com/ybw0014/guizhan-builds-2-frontend/master/frontend/public/repos.json?t=${new Date().getTime()}`
    )
    return useParseProjects(rawProjects)
  } catch (err) {
    logger.error('获取项目列表失败')
    return []
  }
}
