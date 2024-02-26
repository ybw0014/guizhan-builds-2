/**
 * 旧版（v1）构建信息
 */
export interface LegacyBuildInfo {
  id: number
  commit: string
  author: string
  timestamp: number
  message: string
  success: boolean
  build_timestamp: number
  target: string
}
