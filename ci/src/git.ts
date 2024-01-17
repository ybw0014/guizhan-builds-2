/**
 * 本地 Git 相关
 */
import { spawnSync, SpawnSyncOptions } from 'child_process'
import _ from 'lodash'
import { BuildTask } from '@/types'

const defaultGitOptions: Partial<SpawnSyncOptions> = {
  cwd: process.cwd(),
  env: process.env,
  stdio: [process.stdin, process.stdout, process.stderr],
  encoding: 'utf-8'
}

export function gitExec(params: string[], options?: Partial<SpawnSyncOptions>) {
  return spawnSync(
    'git',
    params,
    _.defaults(options, defaultGitOptions)
  )
}

export async function gitClone(task: BuildTask) {
  await gitExec(['clone', `https://github.com/${task.project.author}/${task.project.repository}`, '.'], {
    cwd: task.workspace
  })
}
