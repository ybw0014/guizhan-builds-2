
/**
 * v2所有构建信息
 */
import { BuildInfo } from "./BuildInfo";

export interface BuildsInfo {
  latest: string // 最新构建commit的hash
  builds: BuildInfo[]
}
