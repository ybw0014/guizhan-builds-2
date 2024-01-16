import { Ctx } from '~/types/hono'
import { fetchMcVersions } from '~/utils/external/mojangApi'
import { responseOk } from '~/utils/response'
import { compareVersions } from 'compare-versions'

export async function getMcVersions(ctx: Ctx) {
  const manifest = await fetchMcVersions()
  const versions = manifest.versions
    .filter(ver => ver.type === 'release')
    .map(ver => ver.id)
    .filter(version => compareVersions(version, '1.16.5') >= 0)
  return ctx.jsonT(responseOk('Success', versions))
}
