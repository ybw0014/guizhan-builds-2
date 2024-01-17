/**
 * axios 请求封装
 */
import axios from 'axios'
import { Octokit } from 'octokit'

const TOKEN = process.env.BOT_TOKEN || ''
const USER_AGENT =
  process.env.USER_AGENT ||
  'Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/72.0.3626.121 Safari/537.36'

const request = axios.create({
  timeout: 5000,
  headers: {
    'User-Agent': USER_AGENT
  }
})

const githubRequest = new Octokit({
  auth: TOKEN,
  userAgent: USER_AGENT,
  request: {
    timeout: 5000
  }
})

export { request, githubRequest }
