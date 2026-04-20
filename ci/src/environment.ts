/**
 * 环境变量相关
 */
import { Logger } from '@/utils/Logger'

const logger = new Logger('env')

let dryRunMode = false

export function setDryRun(value: boolean) {
  dryRunMode = value
}

export function envHas(envName: string) {
  if (process.env[envName] === undefined) {
    if (dryRunMode) {
      logger.warn(`未设置环境变量: ${envName}`)
    } else {
      logger.error(`未设置环境变量: ${envName}`)
      process.exit(1)
    }
  }
}
