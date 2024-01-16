import type { UnstableDevWorker } from 'wrangler'
import { describe, beforeAll, test, expect } from 'vitest'
import { setupWorker } from './utils/testutils'

describe('Test api base', () => {
  let worker: UnstableDevWorker

  beforeAll(async () => {
    worker = await setupWorker()
  })

  test('Test /', async () => {
    const response = await worker.fetch('/')
    expect(response.status).toBe(200)
  })

  test('Test not found route', async () => {
    const response = await worker.fetch('/notfound')
    expect(response.status).toBe(404)
  })
})
