declare module 'guizhan-builds-data' {
  interface ProjectBuildOptions {
    name: string
    version: string
    customDir?: string
  }

  interface ProjectDisplayOptions {
    hidden?: boolean
    name?: string
    authors?: string[]
    keywords?: string[]
    requirements?: Record<string, Record<string, string>>
  }

  interface RawProject {
    type: 'maven' | 'gradle'
    alias: Array<string> | undefined
    buildOptions: ProjectBuildOptions
    displayOptions?: ProjectDisplayOptions
  }

  interface Project extends RawProject {
    key: string
    author: string
    repository: string
    branch: string
  }

  interface Author extends Record<string, any> {
    name: string
    projects: number
  }

  interface LegacyBuildInfo {
    author: string
    build_timestamp: number
    commit: string
    id: number
    message: string
    success: boolean
    target: string
    timestamp: number
  }

  interface LegacyBuildsInfo {
    latest: number // 最新构建commit的时间戳
    builds: LegacyBuildInfo[]
  }

  interface BuildInfo extends Omit<LegacyBuildInfo, 'build_timestamp'> {
    buildTimestamp: number
    sha1: string
  }

  interface BuildsInfo {
    latest: string // 最新构建commit的hash
    builds: BuildInfo[]
  }
}
