import { request } from '@/request'
import { BuildTask } from '@/types'

const WEBHOOK_URL = process.env.WEBHOOK_URL || ''
const WEBHOOK_KEY = process.env.WEBHOOK_KEY || ''

export async function notify(task: BuildTask) {
  try {
    const build = {
      user: task.project.author,
      repo: task.project.repository,
      branch: task.project.branch,
      version: task.version,
      success: task.success
    }

    await request({
      url: WEBHOOK_URL,
      method: 'post',
      headers: { Authorization: WEBHOOK_KEY },
      data: build
    })
    task.logger.success('推送通知成功')
  } catch (e) {
    task.logger.error('推送通知失败')
  }
}
