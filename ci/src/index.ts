/**
 * 项目入口
 */
import 'dotenv/config'
import fs from 'fs/promises'
import { BuildTask } from '@/types'
import { getProjects } from '@/projects'
import { buildTask } from '@/task'
import { getLatestCommit } from '@/github'
import { getBuilds, updateBuildTime, uploadBuilds } from '@/project'
import { dayjs } from '@/date'
import { gitClone } from '@/git'
import maven from '@/mavenB'
import gradle from '@/gradleB'
import { notify } from '@/webhook'
import { envHas } from './environment'

const nodeEnv = process.env.NODE_ENV ?? 'development'

async function main() {
  environmentCheck()
  console.log('> 初始化项目')

  const projects = await getProjects()
  console.log(`> 已加载 ${projects.length} 个项目`)

  for (let i = 0; i < projects.length; i++) {
    // 开发环境仅构建第一个项目
    if (nodeEnv === 'development' && i >= 1) {
      break
    }
    const project = projects[i]
    console.log('')
    console.log(`> 开始处理项目: ${project.key} (${i + 1}/${projects.length})`)
    const task = await buildTask(projects[i])

    const buildVersion = await check(task)
    if (!buildVersion) {
      console.log('!> 已是最新/无需构建')
      continue
    }
    task.version = buildVersion

    console.log(`!> 开始执行构建 #${buildVersion}`)
    console.log('正在进行准备任务')
    await prepare(task, buildVersion)

    console.log('开始构建')
    try {
      await build(task)
      console.log('构建成功')
      task.success = true
    } catch (e) {
      task.success = false
      console.error('构建失败')
    }

    console.log('执行清理工作')
    await cleanup(task)
  }
}

function environmentCheck() {
  console.log(`> 当前运行环境为: ${nodeEnv}`)
  console.log('> 正在检查环境变量')
  envHas('R2_ACCOUNT_ID')
  envHas('R2_ACCESS_KEY_ID')
  envHas('R2_SECRET_ACCESS_KEY')
  envHas('R2_BUCKET_NAME')
  envHas('BOT_TOKEN')
  envHas('WEBHOOK_URL')
  envHas('WEBHOOK_KEY')
  console.log('> 环境变量检查完成\n')
}

async function check(task: BuildTask): Promise<number | null> {
  console.log('获取最新 commit')
  const commit = await getLatestCommit(task.project)
  if (commit == null) {
    return null
  }
  if (commit.commit.message.toLowerCase().startsWith('[ci skip]')) {
    console.log('项目跳过构建')
    return null
  }
  const buildsInfo = await getBuilds(task.project)

  task.commit = {
    timestamp: dayjs(commit.commit.author?.date as string || Date.now()).valueOf(),
    author: (commit.author?.login ?? commit.commit.author?.name) || '',
    message: commit.commit.message,
    sha: commit.sha
  }

  if (buildsInfo === null) {
    return 1
  } else if (commit.sha !== buildsInfo.latest) {
    return buildsInfo.builds.length + 1
  } else {
    return null
  }
}

async function prepare(task: BuildTask, version: number) {
  const date = dayjs(task.commit?.timestamp)

  task.finalVersion = task.project.buildOptions.version
    .replace('{version}', version.toString())
    .replace('{git_commit}', task.commit?.sha.slice(0, 7) ?? '')
    .replace('{Year}', date.year().toString())
    .replace('{year}', date.year().toString().slice(2))
    .replace('{Month}', (date.month() + 1).toString().padStart(2, '0'))
    .replace('{month}', (date.month() + 1).toString())
    .replace('{Date}', date.date().toString().padStart(2, '0'))
    .replace('{date}', date.date().toString())

  try {
    await fs.access(task.workspace)
    console.log('工作目录已存在，正在清理')
    await fs.rm(task.workspace, { recursive: true })
    await fs.mkdir(task.workspace, { recursive: true })
  } catch (ignored) {
    try {
      await fs.mkdir(task.workspace, { recursive: true })
    } catch (e) {
      console.error('创建工作目录失败')
      process.exit(1)
    }
  }

  console.log('克隆仓库中')
  await gitClone(task)

  console.log('设置版本信息')
  if (task.project.type === 'maven') {
    await maven.setVersion(task)
  } else if (task.project.type === 'gradle') {
    await gradle.setVersion(task)
  }
}

async function build(task: BuildTask) {
  if (task.project.type === 'maven') {
    await maven.build(task)
  } else if (task.project.type === 'gradle') {
    await gradle.build(task)
  }
}

async function cleanup(task: BuildTask) {
  if (task.project.type === 'maven') {
    await maven.cleanup(task)
  } else if (task.project.type === 'gradle') {
    await gradle.cleanup(task)
  }

  console.log('正在清理工作目录')
  await fs.rm(task.workspace, { recursive: true })

  console.log('正在上传构建信息')
  await uploadBuilds(task)
  console.log('正在更新构建时间记录')
  await updateBuildTime(task)

  console.log('正在推送通知')
  await notify(task)
}

main()
