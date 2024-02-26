
/**
 * 用于处理的项目信息
 */
import { RawProject } from "./RawProject";

export interface Project extends RawProject {
  key: string
  author: string
  repository: string
  branch: string
}
