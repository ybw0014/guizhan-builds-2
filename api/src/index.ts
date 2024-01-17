import { OpenAPIHono } from '@hono/zod-openapi'
import { swaggerUI } from '@hono/swagger-ui'
import { response } from '~/utils/response'
import { getProject, getProjects } from '~/controllers/projects'
import { getBuilds, getBuild, downloadBuild } from '~/controllers/builds'
import { getMcVersions } from '~/controllers/mcVersion'
import { getBuildBadge } from '~/controllers/buildBadge'
import { badgeCache } from '~/middlewares/badgeCache'
import { projectsRoute, projectRoute } from '~/routes/projects'
import { mcVersionsRoute } from '~/routes/mcVersions'
import { buildRoute, buildsRoute } from '~/routes/builds'
import { version } from '~/../package.json'

const app = new OpenAPIHono()

app.notFound((ctx) => ctx.json(response(404, 'Route not found!'), 404))
app.onError((err, ctx) => {
  console.error(`${err}`)
  return ctx.json(response(500, 'Internal server error!'), 500)
})

app.get('/', (ctx) => ctx.json(
  response(0, 'Guizhan Builds 2 API. See /openapi for OpenAPI endpoints, /docs for readable docs')
))
app.doc('/openapi', {
  openapi: '3.1.0',
  info: {
    title: 'Guizhan Builds 2 API',
    version
  }
})
app.use('/docs', swaggerUI({ url: './openapi' }))

app.openapi(mcVersionsRoute, getMcVersions)
app.openapi(projectsRoute, getProjects)
app.openapi(projectRoute, getProject)
app.openapi(buildsRoute, getBuilds)
app.openapi(buildRoute, getBuild)

// special endpoints that do not return json
app.get('/download/:author/:repository/:branch/:build', downloadBuild)

app.get('/badge/*', badgeCache({ cacheControl: 'max-age=3600' }))
app.get('/badge/:author/:repository/:branch/:build', getBuildBadge)

export default app
