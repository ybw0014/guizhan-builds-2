import type { UnstableDevWorker } from 'wrangler'
import { describe, beforeAll, test, expect, expectTypeOf } from 'vitest'
import { setupWorker } from './utils/testutils'
import { ApiResponseTyped } from '~/types/api'
import { ProjectResponse } from '~/types/builds'
import { Project } from 'guizhan-builds-2-data'

describe('Test projects', () => {
  let worker: UnstableDevWorker

  beforeAll(async () => {
    worker = await setupWorker()
  })

  test('Test /projects', async () => {
    const response = await worker.fetch('/projects')
    expect(response.status).toBe(200)

    const respJson = await response.json()
    expect(respJson).toHaveProperty('data')
    const resp = respJson as ApiResponseTyped<ProjectResponse[]>

    expectTypeOf(resp.data).toBeArray()

    const data = resp.data[0]
    expectTypeOf(data).toEqualTypeOf<ProjectResponse>()
  })

  test('Test /project/:author/:repository/:branch', async () => {
    const response = await worker.fetch('/project/StarWishsama/Slimefun4/master')
    expect(response.status).toBe(200)

    const response2 = await worker.fetch('/project/ThisDoesNotExist/NotExistAsWell/master')
    expect(response2.status).toBe(404)

    const respJson = await response.json()
    expect(respJson).toHaveProperty('data')
    const resp = respJson as ApiResponseTyped<Project>

    const data = resp.data
    expectTypeOf(data).toEqualTypeOf<Project>()
  })

})
