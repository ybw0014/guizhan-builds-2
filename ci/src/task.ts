/**
 * 项目任务相关方法
 */
import { Project } from 'guizhan-builds-2-types'
import { resolve } from 'path'
import { BuildTask } from '@/types'
import { Logger } from '@/utils/Logger'

const WORK_DIR = process.env.WORK_DIR ?? process.cwd()
const logger = new Logger('task')

export async function buildTask(project: Project): Promise<BuildTask> {
  logger.info(`建立项目任务: ${project.key}`)

  return {
    project,
    logger: new Logger(project.key),
    workspace: resolve(WORK_DIR, `./workspace/${project.author}/${project.repository}/${project.branch}`),
    buildTime: Date.now()
  }
}
