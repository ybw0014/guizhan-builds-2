/**
 * GitHub 相关
 */
import { Project } from 'guizhan-builds-2-data'
import { Endpoints } from '@octokit/types'
import { githubRequest } from '@/request'

type CommitResponse = Endpoints['GET /repos/{owner}/{repo}/commits']['response']['data'][0] | null

export async function getLatestCommit(project: Project): Promise<CommitResponse> {
  try {
    const { data } = await githubRequest.request('GET /repos/{owner}/{repo}/commits', {
      owner: project.author,
      repo: project.repository,
      sha: project.branch,
      per_page: 1
    })
    return data[0]
  } catch (e) {
    console.error('获取最新commit失败')
    return null
  }
}
