import { Project } from 'guizhan-builds-2-types'
import { Logger } from '@/utils/Logger'

export interface TaskCommit {
  timestamp: number
  author: string
  message: string
  sha: string
}

export interface BuildTask {
  project: Project
  logger: Logger
  buildTime: number // 构建时间
  workspace: string // 源代码根目录
  version?: number // 构建自增版本号
  commit?: TaskCommit // 当前构建的 commit 信息
  finalVersion?: string // 构建工件的最终版本号
  success?: boolean // 构建是否成功
  target?: string // 构建工件的文件名
  sha1?: string // 构建工件的 sha1
}
