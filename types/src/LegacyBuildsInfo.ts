/**
 * 旧版（v1）所有构建信息
 */
import { LegacyBuildInfo } from "./LegacyBuildInfo";

export interface LegacyBuildsInfo {
  latest: number // 最新构建commit的时间戳
  builds: LegacyBuildInfo[]
}
