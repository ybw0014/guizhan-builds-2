/**
 * Gradle 项目相关方法
 */
import { resolve } from 'path'
import { readFile, writeFile, open } from 'fs/promises'
import { SpawnOptions } from 'child_process'
import { uploadFile } from '@/r2'
import { getFileSha1 } from '@/checksum'
import { BuildTask } from '@/types'
import { fileExists, spawnProcess, sanitizeEnv } from '@/utils'
import { chmod } from 'fs/promises'
import { MultiStream } from '@/utils/MultiStream'

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
  const config = await readFile(filePath, 'utf8')
  const newConfig = config
    .replace('\r\n', '\n')
    .split('\n')
    .filter((cfgLine) => {
      return !cfgLine.startsWith('version')
    })
    .join('\n')

  await writeFile(filePath, newConfig, 'utf8')
}

async function setupProperties(task: BuildTask) {
  const filePath = resolve(task.workspace, './gradle.properties')
  const line = 'version = ' + task.finalVersion

  if (await fileExists(filePath)) {
    const config = await readFile(filePath, 'utf8')
    const newConfigs = config
      .replace('\r\n', '\n')
      .split('\n')
      .filter((cfgLine) => {
        return !cfgLine.startsWith('version')
      })

    newConfigs.push(line)
    const newConfig = newConfigs.join('\n')

    await writeFile(filePath, newConfig, 'utf8')
  } else {
    const newConfig = line + '\n'
    await writeFile(filePath, newConfig, 'utf8')
  }
}

async function setupSettings(task: BuildTask) {
  const kotlin = task.project.buildOptions?.gradle?.kotlin
  const fileName = kotlin ? 'settings.gradle.kts' : 'settings.gradle'
  const filePath = resolve(task.workspace, `./${fileName}`)
  const quote = kotlin ? '"' : "'"
  const line = `rootProject.name = ${quote}${task.project.buildOptions.name}${quote}`

  if (await fileExists(filePath)) {
    const config = await readFile(filePath, 'utf8')
    const newConfigs = config
      .replace('\r\n', '\n')
      .split('\n')
      .filter((cfgLine) => {
        return !cfgLine.startsWith('rootProject.name')
      })

    newConfigs.push(line)
    const newConfig = newConfigs.join('\n')

    await writeFile(filePath, newConfig, 'utf8')
  } else {
    const newConfig = line + '\n'
    await writeFile(filePath, newConfig, 'utf8')
  }
}

export async function build(task: BuildTask) {
  const logFilename = resolve(task.workspace, './gradle.log')
  const logFile = await open(logFilename, 'w')
  const logStream = logFile.createWriteStream()
  const logStdoutStream = new MultiStream([process.stdout, logStream])
  const logStderrStream = new MultiStream([process.stderr, logStream])

  const args = ['clean', 'build']
  if (task.project.buildOptions.gradle?.shadowJar) {
    args.push('shadowJar')
  }

  const gradleOptions: Partial<SpawnOptions> = {
    cwd: task.workspace,
    env: sanitizeEnv(process.env)
  }

  try {
    const gradlewPath = resolve(task.workspace, './gradlew')
    if (await fileExists(gradlewPath)) {
      await chmod(gradlewPath, 0o755)
    }
    await spawnProcess('./gradlew', args, gradleOptions, logStdoutStream, logStderrStream)
  } catch (e) {
    logFile.close()
    task.logger.error('Gradle 构建失败', e)
    throw e
  }
}

export async function cleanup(task: BuildTask) {
  const path = `${task.project.author}/${task.project.repository}/${task.project.branch}`
  // 构建成功时上传构建结果
  if (task.success) {
    const suffix = task.project.buildOptions.gradle?.shadowJar ? '-all' : ''
    const targetFormat = task.project.buildOptions.gradle?.target ?? `{name}-{version}-${suffix}`
    const target =
      targetFormat.replace('{name}', task.project.buildOptions.name).replace('{version}', task.finalVersion ?? '') + '.jar'
    const targetFinal = `${task.project.buildOptions.name}-${task.finalVersion}.jar`
    const targetPath = resolve(task.workspace, './build/libs', target)

    if (!await fileExists(targetPath)) {
      task.logger.error(`构建产物不存在: ${targetPath}`)
      task.success = false
    } else if (task.dryRun) {
      task.logger.info(`[试运行] 将上传构建产物: ${path}/${targetFinal} (sha1: ${task.sha1})`)
      task.target = targetFinal
      task.sha1 = await getFileSha1(targetPath)
    } else {
      await uploadFile(`${path}/${targetFinal}`, targetPath)
      task.target = targetFinal
      task.sha1 = await getFileSha1(targetPath)
    }
  }

  // 上传日志
  const logPath = resolve(task.workspace, './gradle.log')
  if (await fileExists(logPath)) {
    if (task.dryRun) {
      task.logger.info(`[试运行] 将上传构建日志: ${path}/Build-${task.version}.log`)
    } else {
      await uploadFile(`${path}/Build-${task.version}.log`, logPath, 'text/plain')
    }
  }
}

export default { setVersion, build, cleanup }
