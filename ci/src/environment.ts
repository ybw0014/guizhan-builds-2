/**
 * 环境变量相关
 */

/**
 * 检查环境变量是否存在
 * @param envName 环境变量名
 */
export function envHas(envName: string) {
  if (process.env[envName] === undefined) {
    envExit(`未设置环境变量: ${envName}`)
  }
}

function envExit(message: string) {
  console.error(message)
  process.exit(1)
}
