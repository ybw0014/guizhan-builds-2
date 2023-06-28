import NProgress from 'nprogress'
import { nextTick } from 'vue'
import 'nprogress/nprogress.css'
import { defineNuxtPlugin, useRouter } from '#imports'

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let progressBarTimeout: any

const startProgressBar = () => {
  useNprogressLog('start progress bar')
  clearTimeout(progressBarTimeout)
  progressBarTimeout = setTimeout(NProgress.start, 400)
}

const stopProgressBar = () => {
  useNprogressLog('stop progress bar')
  clearTimeout(progressBarTimeout)
  NProgress.done()
}

export default defineNuxtPlugin(() => {
  if (!process.server) {
    useRouter().beforeEach(() => {
      startProgressBar()
    })
    useRouter().afterEach(async () => {
      await nextTick(() => stopProgressBar())
    })
  }
})
