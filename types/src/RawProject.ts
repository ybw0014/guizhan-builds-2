/**
 * repos.json 文件中的原始项目信息
 */
import { ProjectBuildOptions } from "./ProjectBuildOptions";
import { ProjectDisplayOptions } from "./ProjectDisplayOptions";

export interface RawProject {
  type: "maven" | "gradle"
  alias: Array<string> | undefined
  buildOptions: ProjectBuildOptions
  displayOptions?: ProjectDisplayOptions
}
