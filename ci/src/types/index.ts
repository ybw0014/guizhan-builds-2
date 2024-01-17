import { Project } from 'guizhan-builds-2-data'

export interface TaskCommit {
  timestamp: number,
  author: string,
  message: string,
  sha: string
}

export interface BuildTask {
  project: Project
  buildTime: number
  workspace: string
  version?: number
  commit?: TaskCommit
  finalVersion?: string
  success?: boolean
  target?: string
  sha1?: string
}
