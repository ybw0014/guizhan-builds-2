/**
 * 项目信息的构建设置
 */
export interface ProjectBuildOptions {
  name: string
  version: string
  customDir?: string
  maven?: Record<string, string>
  gradle?: Record<string, string>
}
