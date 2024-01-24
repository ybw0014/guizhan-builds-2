import { Hono } from 'hono'
import { getProject, getProjects } from '~/controllers/projects'
import { getBuilds, getBuild, downloadBuild } from '~/controllers/builds'
import { InternalError, RouteNotFound } from '~/api/errors'
import { success } from '~/api/response'
import { getMcVersions } from '~/controllers/mcVersion'
import { getBuildBadge } from '~/controllers/buildBadge'
import { badgeCache } from '~/middlewares/badgeCache'

const app = new Hono()

app.notFound(() => RouteNotFound.toResponse())
app.onError((err) => {
  console.error(`${err}`)
  return InternalError.toResponse()
})

app.get('/', () => success(
  'Guizhan Builds 2 API',
  {
    'api_reference_url': 'https://docs.ybw0014.dev/guizhan-builds/api/reference/'
  }
))

app.get('/mc-versions', getMcVersions)

// projects
app.get('/projects', getProjects)
app.get('/project/:author/:repository/:branch', getProject)

// builds
app.get('/builds/:author/:repository/:branch', getBuilds)
app.get('/build/:author/:repository/:branch/:build', getBuild)
app.get('/download/:author/:repository/:branch/:build', downloadBuild)

app.get('/badge/*', badgeCache({ cacheControl: 'max-age=3600' }))
app.get('/badge/:author/:repository/:branch/:build', getBuildBadge)

export default app
