import resolveAcceptLanguage from 'resolve-accept-language'

export const enum Field {
  BUILD,
  SUCCESS,
  FAILED,
  UNKNOWN
}

export function getLanguage(acceptLanguage: string) {
  return resolveAcceptLanguage(
    acceptLanguage,
    ['en-US', 'zh-CN'] as const,
    'en-US'
  )
}

export function getText(lang: string, field: Field) {
  switch (lang) {
    case 'zh-CN':
      switch (field) {
        case Field.BUILD:
          return '构建'
        case Field.SUCCESS:
          return '成功'
        case Field.FAILED:
          return '失败'
        case Field.UNKNOWN:
          return '未知'
      }
      break
    case 'en-US':
      switch (field) {
        case Field.BUILD:
          return 'Build'
        case Field.SUCCESS:
          return 'Success'
        case Field.FAILED:
          return 'Failed'
        case Field.UNKNOWN:
          return 'Unknown'
      }
      break
  }
}
