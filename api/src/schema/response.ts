import { z } from '@hono/zod-openapi'

export function responseSchema(code: number, message: string) {
  return z.object({
    code: z.number().openapi({
      description: 'The response code, can be different from the HTTP status code',
      example: code
    }),
    message: z.string().openapi({
      description: 'The response message',
      example: message
    })
  })
}

export function responseSchemaWithData(code: number, message: string, data: z.ZodObject<any> | z.ZodArray<any>) {
  return z.object({
    code: z.number().openapi({
      description: 'The response code, can be different from the HTTP status code',
      example: code
    }),
    message: z.string().openapi({
      description: 'The response message',
      example: message
    }),
    data
  })
}

export function responseSuccessSchema(data: any) {
  return responseSchemaWithData(200, 'Success', data)
}
