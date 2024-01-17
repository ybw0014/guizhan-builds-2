import { Ctx } from '~/types/hono'
import { fetchBuild, fetchBuilds, fetchProject } from '~/utils/external/guizhanBuilds'
import { Field, getLanguage, getText } from '~/services/i18n'
import { Badge } from '~/components/badge'

export async function getBuildBadge(ctx: Ctx) {
  const userLang = getLanguage(ctx.req.header('Accept-Language'))
  // we display a badge anyways
  ctx.header('Content-Type', 'image/svg+xml;charset=utf-8')

  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ctx.body(getBadge(Field.UNKNOWN, userLang))
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return ctx.body(getBadge(Field.UNKNOWN, userLang))
  }

  const build = await fetchBuild(buildsInfo, ctx.req.param('build'))
  if (!build) {
    return ctx.body(getBadge(Field.UNKNOWN, userLang))
  }

  return ctx.body(
    getBadge(build.success ? Field.SUCCESS : Field.FAILED, userLang)
  )
}

function getBadge(status: Field, lang: string): string {
  let color: string
  switch (status) {
    case Field.SUCCESS:
      color = '#009688'
      break
    case Field.FAILED:
      color = '#f34436'
      break
    default:
      color = '#000000'
  }
  return (
    <Badge
      build={getText(lang, Field.BUILD)}
      status={getText(lang, status)}
      color={color}
    />
  ).toString()
}
