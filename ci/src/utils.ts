import { stat } from 'fs/promises'

/**
 * 等待一段时间
 * @param ms 等待的毫秒数
 */
export function sleep(ms: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, ms))
}

export async function fileExists(path: string): Promise<boolean> {
  return stat(path).then(() => true).catch(() => false)
}
