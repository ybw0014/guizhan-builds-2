import { ProjectNotFound } from '~/api/errors'
import { success } from '~/api/response'
import type { Ctx } from '~/types/hono'
import { paginate } from '~/utils'
import { fetchProjects, fetchProject } from '~/utils/external/guizhanBuilds'

export async function getProjects(ctx: Ctx) {
  const projects = await fetchProjects()

  const result = projects.map(project => ({
    author: project.author,
    repository: project.repository,
    branch: project.branch
  }))

  return success('OK', paginate(result, ctx, 30))
}

export async function getProject(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ProjectNotFound.toResponse()
  }
  return success('OK', project)
}
