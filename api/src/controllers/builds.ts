import { Ctx } from '~/types/hono'
import { fetchBuild, fetchBuilds, fetchProject } from '~/utils/external/guizhanBuilds'
import { response, responseOk } from '~/utils/response'

export async function getBuilds(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ctx.jsonT(response(404, 'Project not found!'), 404)
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return ctx.jsonT(response(404, 'Build not found!'), 404)
  }
  return ctx.jsonT(responseOk('Success', buildsInfo.builds))
}

export async function getBuild(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ctx.jsonT(response(404, 'Project not found!'), 404)
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return ctx.jsonT(response(404, 'Build not found!'), 404)
  }

  const build = await fetchBuild(buildsInfo, ctx.req.param('build'))
  if (!build) {
    return ctx.jsonT(response(404, 'Build not found!'), 404)
  }

  return ctx.jsonT(responseOk('Success', build))
}

export async function downloadBuild(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ctx.jsonT(response(404, 'Project not found!'), 404)
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return ctx.jsonT(response(404, 'Build not found!'), 404)
  }

  const build = await fetchBuild(buildsInfo, ctx.req.param('build'))
  if (!build) {
    return ctx.jsonT(response(404, 'Build not found!'), 404)
  }

  return ctx.redirect(
    `https://builds-r2.gzassets.net/${project.author}/${project.repository}/${project.branch}/${build.target}`
  )
}
