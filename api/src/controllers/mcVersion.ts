import { fetchMcVersions } from '~/utils/external/mojangApi'
import { compareVersions } from 'compare-versions'
import { success } from '~/api/response'

export async function getMcVersions() {
  const manifest = await fetchMcVersions()
  const versions = manifest.versions
    .filter(ver => ver.type === 'release')
    .map(ver => ver.id)
    .filter(version => compareVersions(version, '1.16.5') >= 0)
  return success('OK', versions)
}
