/**
 * Gradle 项目相关方法
 */
import { resolve } from 'path'
import fs from 'fs/promises'
import { spawnSync, SpawnSyncOptions } from 'child_process'
import { uploadFile } from '@/r2'
import { getFileSha1 } from '@/checksum'
import { BuildTask } from '@/types'

export async function setVersion(task: BuildTask) {
  // 去除 build.gradle(.kts) 版本信息
  await removeBuildVersion(task)
  // 设置 gradle.properties 版本
  await setupProperties(task)
  // 设置 settings.gradle 项目名称
  await setupSettings(task)
}

async function removeBuildVersion(task: BuildTask) {
  const buildGradle = task.project.buildOptions?.gradle?.kotlin ? 'build.gradle.kts' : 'build.gradle'
  const filePath = resolve(task.workspace, `./${buildGradle}`)
  const config = await fs.readFile(filePath, 'utf8')
  const newConfig = config
    .replace('\r\n', '\n')
    .split('\n')
    .filter((cfgLine) => {
      return !cfgLine.startsWith('version')
    })
    .join('\n')

  await fs.writeFile(filePath, newConfig, 'utf8')
}

async function setupProperties(task: BuildTask) {
  const filePath = resolve(task.workspace, './gradle.properties')
  const line = 'version = ' + task.finalVersion

  if (await fs.stat(filePath).then(() => true).catch(() => false)) {
    const config = await fs.readFile(filePath, 'utf8')
    const newConfigs = config
      .replace('\r\n', '\n')
      .split('\n')
      .filter((cfgLine) => {
        return !cfgLine.startsWith('version')
      })

    newConfigs.push(line)
    const newConfig = newConfigs.join('\n')

    await fs.writeFile(filePath, newConfig, 'utf8')
  } else {
    const newConfig = line + '\n'
    await fs.writeFile(filePath, newConfig, 'utf8')
  }
}

async function setupSettings(task: BuildTask) {
  const filePath = resolve(task.workspace, './settings.gradle')
  const line = `rootProject.name = '${task.project.buildOptions.name}'`

  if (await fs.stat(filePath).then(() => true).catch(() => false)) {
    const config = await fs.readFile(filePath, 'utf8')
    const newConfigs = config
      .replace('\r\n', '\n')
      .split('\n')
      .filter((cfgLine) => {
        return !cfgLine.startsWith('rootProject.name')
      })

    newConfigs.push(line)
    const newConfig = newConfigs.join('\n')

    await fs.writeFile(filePath, newConfig, 'utf8')
  } else {
    const newConfig = line + '\n'
    await fs.writeFile(filePath, newConfig, 'utf8')
  }
}

export async function build(task: BuildTask) {
  const logFilename = resolve(task.workspace, './gradle.log')
  const logFile = await fs.open(logFilename, 'w')
  const logStream = logFile.createReadStream()

  const args = ['clean', 'build']
  if (task.project.buildOptions.gradle?.shadowJar) {
    args.push('shadowJar')
  }

  const gradleOptions: Partial<SpawnSyncOptions> = {
    cwd: task.workspace,
    env: process.env,
    stdio: [process.stdin, logStream, logStream],
    encoding: 'utf-8'
  }

  await spawnSync('./gradlew', args, gradleOptions)
}

export async function cleanup(task: BuildTask) {
  const path = `${task.project.author}/${task.project.repository}/${task.project.branch}`
  // 构建成功时上传构建结果
  if (task.success) {
    const suffix = task.project.buildOptions.gradle?.shadowJar ? '-all' : ''
    const targetFormat = task.project.buildOptions.gradle?.target ?? `{name}-{version}-${suffix}`
    const target = targetFormat.replace('{name}', task.project.buildOptions.name)
      .replace('{version}', task.finalVersion ?? '') + '.jar'
    const targetFinal = `${task.project.buildOptions.name}-${task.finalVersion}.jar`
    const targetPath = resolve(task.workspace, './build/libs', target)
    await uploadFile(`${path}/${targetFinal}`, targetPath)

    // 获取checksum
    task.target = targetFinal
    task.sha1 = await getFileSha1(targetPath)
  }

  // 上传日志
  const logPath = resolve(task.workspace, './gradle.log')
  await uploadFile(`${path}/Build-${task.version}.log`, logPath, 'text/plain')
}

export default { setVersion, build, cleanup }
