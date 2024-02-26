/**
 * 项目信息的显示设置
 */
export interface ProjectDisplayOptions {
  officialList?: boolean
  language?: string
  hidden?: boolean
  name?: string
  logo?: string
  authors?: string[]
  wiki?: string
  keywords?: string[]
  requirements?: Record<string, Record<string, string>>
}
