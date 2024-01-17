/**
 * 等待一段时间
 * @param ms 等待的毫秒数
 */
export function sleep(ms: number): Promise<unknown> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
