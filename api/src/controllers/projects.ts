import { response, responseOk } from '~/utils/response'
import { fetchProjects, fetchProject } from '~/utils/external/guizhanBuilds'
import { Ctx } from '~/types/hono'

export async function getProjects(ctx: Ctx) {
  const projects = await fetchProjects()

  const result = []
  for (const project of projects) {
    result.push({
      author: project.author,
      repository: project.repository,
      branch: project.branch
    })
  }

  return ctx.jsonT(responseOk('Success', result))
}

export async function getProject(ctx: Ctx) {
  const project = await fetchProject(ctx.req.param('author'), ctx.req.param('repository'), ctx.req.param('branch'))
  if (!project) {
    return ctx.jsonT(response(404, 'Project not found!'), 404)
  }
  return ctx.jsonT(responseOk('Success', project))
}
