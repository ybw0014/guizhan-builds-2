/**
 * 本地 Git 相关
 */
import { SpawnOptions } from 'child_process'
import { BuildTask } from '@/types'
import { spawnProcess } from '@/utils'

export async function gitExec(params: string[], options?: Partial<SpawnOptions>) {
  await spawnProcess(
    'git',
    params,
    options ?? {}
  )
}

export async function gitClone(task: BuildTask) {
  await gitExec(['clone', `https://github.com/${task.project.author}/${task.project.repository}`, '.'], {
    cwd: task.workspace
  })
}
