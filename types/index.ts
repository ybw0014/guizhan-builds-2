declare module 'guizhan-builds-data' {
  interface ProjectBuildOptions {
    name: string
    version: string
  }

  interface ProjectDisplayOptions {
    dependencies: Record<string, Record<string, string>>
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
}
