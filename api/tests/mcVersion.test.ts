import type { UnstableDevWorker } from 'wrangler'
import { describe, beforeAll, test, expect, expectTypeOf } from 'vitest'
import { setupWorker } from './utils/testutils'
import { ApiResponseTyped } from '~/types/api'

describe('Test mcVersion', () => {
  let worker: UnstableDevWorker

  beforeAll(async () => {
    worker = await setupWorker()
  })

  test('Test /mc-versions', async () => {
    const response = await worker.fetch('/mc-versions')
    expect(response.status).toBe(200)

    const respJson = await response.json()
    expect(respJson).toHaveProperty('data')
    const resp = respJson as ApiResponseTyped<string[]>

    expectTypeOf(resp.data).toBeArray()

    // should have the minimum supported version
    expect(resp.data).toContain('1.16.5')
  })
})
