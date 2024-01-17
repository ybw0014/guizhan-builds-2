/**
 * 单个项目相关
 */
import { BuildInfo, BuildsInfo, Project } from 'guizhan-builds-2-data'
import { BuildTask } from '@/types'
import { getJson, uploadJson } from '@/r2'
import { sleep } from '@/utils'

export async function getBuilds(project: Project): Promise<BuildsInfo | null> {
  console.log(`获取项目构建信息: ${project.key}`)

  let retryTimes = 0
  const maxRetryTimes = 3

  while (retryTimes <= maxRetryTimes) {
    try {
      const data = await getJson<BuildsInfo>(`${project.author}/${project.repository}/${project.branch}/builds.json`)
      if (data === null) {
        throw new Error()
      }
      return data
    } catch (e) {
      console.log(`?> 获取项目构建信息失败，已重试 ${retryTimes} 次`)
      retryTimes++
      await sleep(1500)
    }
  }

  console.log('?> 获取项目构建信息失败，已达到最大重试次数')
  return null
}

export async function uploadBuilds(task: BuildTask) {
  const buildInfo: BuildInfo = {
    id: task.version as number,
    commit: task.commit?.sha ?? '',
    author: task.commit?.author ?? '',
    timestamp: task.commit?.timestamp ?? task.buildTime,
    message: task.commit?.message ?? '',
    success: task.success ?? false,
    buildTimestamp: task.buildTime,
    target: task.target ?? '',
    sha1: task.sha1 ?? ''
  }

  let buildsInfo = await getBuilds(task.project)
  if (buildsInfo === null) {
    console.log('生成全新构建信息')
    buildsInfo = {
      latest: buildInfo.commit,
      builds: [buildInfo]
    } as BuildsInfo
  } else {
    console.log('更新构建信息')
    buildsInfo = {
      latest: buildInfo.commit,
      builds: [...buildsInfo.builds, buildInfo]
    }
  }

  await uploadJson(`${task.project.author}/${task.project.repository}/${task.project.branch}/builds.json`, buildsInfo)
}

export async function updateBuildTime(task: BuildTask) {
  const buildTime = await getJson<Record<string, number>>('buildTimestamp.json')
  if (buildTime === null) {
    return
  }
  buildTime[task.project.key] = task.buildTime
  await uploadJson('buildTimestamp.json', buildTime)
}
