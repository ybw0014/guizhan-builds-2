import { unstable_dev } from 'wrangler'

export async function setupWorker() {
  return unstable_dev('src/index.ts', {
    env: 'dev',
    vars: {
      ENVIRONMENT: 'test'
    },
    updateCheck: false,
    experimental: {
      disableExperimentalWarning: true,
      disableDevRegistry: true,
      forceLocal: true,
      testMode: true
    }
  })
}
