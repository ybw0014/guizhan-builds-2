import { Project } from 'guizhan-builds-data'
export function isMainBranch(branch: string): boolean {
  return ['master', 'main'].includes(branch)
}

export function useGitHubReadme(project: Project) {
  // TODO: fetch readme from github
}
