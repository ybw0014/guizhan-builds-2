import { Response as MinecraftVersionManifestResponse } from '~/types/mcVersion'
import { requestJson } from '~/utils/request'

export async function fetchMcVersions() {
  return await requestJson<MinecraftVersionManifestResponse>(
    'https://launchermeta.mojang.com/mc/game/version_manifest_v2.json'
  )
}
