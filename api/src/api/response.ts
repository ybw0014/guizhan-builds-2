import { StatusCode, type ApiResponse } from '~/types/api'

export function response<T>(resp: ApiResponse<T>, statusCode: StatusCode) {
  return Response.json(resp, { status: statusCode })
}

export function success<T = unknown>(message: string, data: T | null = null) {
  return response({ code: 0, message, data }, StatusCode.OK)
}

export function error(code: number, status: number, message: string) {
  return response({ code, message }, status)
}
