/**
 * v2构建信息
 */
import { LegacyBuildInfo } from "./LegacyBuildInfo";

export interface BuildInfo extends Omit<LegacyBuildInfo, "build_timestamp"> {
  buildTimestamp: number
  sha1: string
}
