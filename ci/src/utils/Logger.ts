import chalk from 'chalk'

export class Logger {
  private tag: string

  constructor(tag: string = '') {
    this.tag = tag
  }

  info(message: string = '') {
    console.log(chalk.blue.bold(`[信息] ${this.tag ? `[${this.tag}]` : ''} `) + chalk.reset(message))
  }

  success(message: string = '') {
    console.log(chalk.green.bold(`[信息] ${this.tag ? `[${this.tag}]` : ''} `) + chalk.reset(message))
  }

  warn(message: string = '') {
    console.warn(chalk.yellow.bold(`[警告] ${this.tag ? `[${this.tag}]` : ''} `) + chalk.reset(message))
  }

  error(message: string = '', ex?: any) {
    const msg = chalk.red.bold(`[错误] ${this.tag ? `[${this.tag}]` : ''} `) + chalk.reset(message)
    if (ex) console.error(msg, ex)
    else console.error(msg)
  }
}
