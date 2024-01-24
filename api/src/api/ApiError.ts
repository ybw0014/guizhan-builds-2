import type { StatusCode } from '~/types/api'
import { error } from '~/api/response'

export class ApiError {
  private code: number
  private statusCode: StatusCode
  private message: string
  
  constructor(code: number, statusCode: StatusCode, message: string) {
    this.code = code
    this.statusCode = statusCode
    this.message = message
  }
  
  getCode(): number {
    return this.code
  }

  getStatusCode(): StatusCode {
    return this.statusCode
  }

  getMessage(): string {
    return this.message
  }

  toResponse(): Response {
    return error(this.code, this.statusCode, this.message)
  }
}
