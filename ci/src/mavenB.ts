/**
 * Maven 相关方法
 */
import { resolve } from 'path'
import { readFile, writeFile, rm } from 'fs/promises'
import { js2xml, xml2js } from 'xml-js'
import maven from 'maven'
import { BuildTask } from '@/types'
import { uploadFile } from '@/r2'
import { getFileSha1 } from '@/checksum'
import { fileExists } from '@/utils'

export async function setVersion(task: BuildTask) {
  const pom = resolve(task.workspace, './pom.xml')
  try {
    const content = await readFile(pom, 'utf-8')
    const pomContent = xml2js(content, { compact: true }) as any
    if (pomContent.project.build.finalName) {
      pomContent.project.build.finalName._text = '${project.name}-${project.version}'
    } else {
      pomContent.project.build.finalName = { _text: '${project.name}-${project.version}' }
    }
    pomContent.project.artifactId._text = task.project.buildOptions.name
    if (pomContent.project.name) {
      pomContent.project.name._text = task.project.buildOptions.name
    }
    pomContent.project.version._text = task.finalVersion
    await writeFile(pom, js2xml(pomContent, { compact: true }))
  } catch (e) {
    console.error('设置 Maven 版本失败', e)
  }
}

export async function build(task: BuildTask) {
  const mvnDir = resolve(task.workspace, './.mvn')
  // 如有.mvn目录则移除
  if (await fileExists(mvnDir)) {
    await rm(mvnDir, { recursive: true })
  }

  const mvn = maven.create({
    cwd: task.workspace,
    batchMode: true,
    logFile: resolve(task.workspace, './maven.log')
  })
  return await mvn.execute(['clean', 'package'])
}

export async function cleanup(task: BuildTask) {
  const r2Dir = `${task.project.author}/${task.project.repository}/${task.project.branch}`
  // 构建成功时上传构建结果
  if (task.success) {
    const target = `${task.project.buildOptions.name}-${task.finalVersion}.jar`
    const targetPath = resolve(task.workspace, './target', target)
    await uploadFile(`${r2Dir}/${target}`, targetPath)

    // 获取checksum
    task.target = target
    task.sha1 = await getFileSha1(targetPath)
  }

  // 上传日志
  const logPath = resolve(task.workspace, './maven.log')
  if (await fileExists(logPath)) {
    await uploadFile(`${r2Dir}/Build-${task.version}.log`, logPath, 'text/plain')
  }
}

export default { setVersion, build, cleanup }
