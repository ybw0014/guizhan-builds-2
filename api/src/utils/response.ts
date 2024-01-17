export function response(code: number, message: string, data?: any) {
  return {
    code,
    message,
    data
  }
}

export function responseOk(message: string, data?: any) {
  return response(0, message, data)
}

