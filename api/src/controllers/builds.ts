import { BuildArtifactNotFound, BuildNotFound, ProjectNotFound } from '~/api/errors'
import { success } from '~/api/response'
import type { Ctx } from '~/types/hono'
import { paginate } from '~/utils'
import { fetchBuild, fetchBuilds, fetchProject } from '~/utils/external/guizhanBuilds'

export async function getBuilds(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ProjectNotFound.toResponse()
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return BuildNotFound.toResponse()
  }

  return success('OK', paginate(buildsInfo.builds, ctx, 30))
}

export async function getBuild(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ProjectNotFound.toResponse()
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return BuildNotFound.toResponse()
  }

  const build = await fetchBuild(buildsInfo, ctx.req.param('build'))
  if (!build) {
    return BuildNotFound.toResponse()
  }

  return success('OK', build)
}

export async function downloadBuild(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ProjectNotFound.toResponse()
  }

  const buildsInfo = await fetchBuilds(ctx.env.R2, project)
  if (!buildsInfo) {
    return BuildNotFound.toResponse()
  }

  const build = await fetchBuild(buildsInfo, ctx.req.param('build'))
  if (!build) {
    return BuildNotFound.toResponse()
  }

  if (!build.success) {
    return BuildArtifactNotFound.toResponse()
  }

  const url = 
    `https://builds-r2.gzassets.net/${project.author}/${project.repository}/${project.branch}/${build.target}`
  const artifact = await fetch(url)
  if (artifact.status !== 200) {
    return BuildArtifactNotFound.toResponse()
  }
  const response = new Response(artifact.body as any, artifact)
  response.headers.set('Content-Type', 'application/octet-stream')
  response.headers.set('Content-Disposition', `attachment; filename="${build.target}"`)
  response.headers.set('X-Build-ID', build.id.toString())
  return response
}
