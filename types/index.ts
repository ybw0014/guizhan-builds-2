declare module 'guizhan-builds-data' {
  import { RouteLocationRaw } from 'vue-router'

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
}
