/**
 * GitHub 相关
 */
import { Endpoints } from '@octokit/types'
import { githubRequest } from '@/request'
import { BuildTask } from '@/types'

type CommitResponse = Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][0] | null

export async function getLatestCommit(task: BuildTask): Promise<CommitResponse> {
  const project = task.project
  try {
    const { data } = await githubRequest.request('GET /repos/{owner}/{repo}/commits', {
      owner: project.author,
      repo: project.repository,
      sha: project.branch,
      per_page: 1
    })
    return data[0]
  } catch (e) {
    task.logger.error('获取最新commit失败')
    return null
  }
}
