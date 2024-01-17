/**
 * 项目任务相关方法
 */
import { Project } from 'guizhan-builds-2-data'
import { resolve } from 'path'
import { BuildTask } from '@/types'

const WORK_DIR = process.env.WORK_DIR ?? process.cwd()

export async function buildTask(project: Project): Promise<BuildTask> {
  console.log(`建立项目任务: ${project.key}`)

  return {
    project,
    workspace: resolve(WORK_DIR, `./workspace/${project.author}/${project.repository}/${project.branch}`),
    buildTime: Date.now()
  }
}
