import { z } from '@hono/zod-openapi'

export const BuildSchema = z.object({
  id: z.number().openapi({
    description: 'The number of the build',
    example: 1
  }),
  commit: z.string().openapi({
    description: 'The commit of the build',
    example: 'a99080ace9cf01074910018e19fe3cead877f6e1'
  }),
  author: z.string().openapi({
    description: 'The author of the commit',
    example: 'ybw0014'
  }),
  timestamp: z.number().openapi({
    description: 'The timestamp of the commit',
    example: 1700680285000
  }),
  message: z.string().openapi({
    description: 'The message of the commit',
    example: 'Update README.md'
  }),
  success: z.boolean().openapi({
    description: 'Whether the build is successful',
    example: true
  }),
  buildTimestamp: z.number().openapi({
    description: 'The timestamp of the build',
    example: 1700680285000
  }),
  target: z.string().openapi({
    description: 'The filename of the build',
    example: 'limefun-e2e-tester-Build 1 (git a99080a).jar'
  }),
  sha1: z.string().openapi({
    description: 'The sha1 of the build',
    example: 'bb36f4f7a18868a08c1a7f42b7ab3a03f68cae36'
  })
})
