import { stat } from 'fs/promises'
import { spawn, SpawnOptions } from 'child_process'
import { Writable } from 'stream'
import _ from 'lodash'

/**
 * 等待一段时间
 * @param ms 等待的毫秒数
 */
export function sleep(ms: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

/**
 * 检查指定路径的文件或文件夹是否存在
 * @param path 路径
 * @returns 是否存在
 */
export async function fileExists(path: string): Promise<boolean> {
  return stat(path).then(() => true).catch(() => false)
}

/**
 * 调用子进程执行命令
 * @param cmd 进程名称
 * @param args 参数
 * @param options 选项
 * @param outStream 输出流
 * @param errStream 错误流
 */
export async function spawnProcess(
  cmd: string,
  args: string[],
  options: Partial<SpawnOptions>,
  outStream: Writable = process.stdout,
  errStream: Writable = process.stderr
): Promise<void> {
  return new Promise((resolve, reject) => {
    const finalOptions = _.defaults(options, {
      cwd: process.cwd(),
      env: process.env,
      stdio: ['ignore', 'pipe', 'pipe']
    })
    const proc = spawn(cmd, args, finalOptions)

    proc.stdout?.pipe(outStream)
    proc.stderr?.pipe(errStream)

    proc.on('exit', (code, signal) => {
      if (code !== 0) {
        reject({ 'code': code, 'signal': signal })
      } else {
        resolve()
      }
    })
    proc.on('error', reject)
  })
}
