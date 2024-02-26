import { ProjectBuildOptions } from "./ProjectBuildOptions";
import { ProjectDisplayOptions } from "./ProjectDisplayOptions";
import { RawProject } from "./RawProject";
import { Project } from "./Project";
import { Projects } from "./Projects";
import { BuildInfo } from "./BuildInfo";
import { BuildsInfo } from "./BuildsInfo";
import { LegacyBuildInfo } from "./LegacyBuildInfo";
import { LegacyBuildsInfo } from "./LegacyBuildsInfo";

export { ProjectBuildOptions, ProjectDisplayOptions, RawProject, Project, Projects, BuildInfo, BuildsInfo, LegacyBuildInfo, LegacyBuildsInfo };

export function useParseProjects(rawProjects: Projects): Project[] {
  const projects: Project[] = [];
  for (const [key, rawProject] of Object.entries(rawProjects)) {
    if (!key.includes("/") && !key.includes(":")) continue;
    const [author, repoNBranch] = key.split("/");
    const [repository, branch] = repoNBranch.split(":");
    const project: Project = {
      key,
      author,
      repository,
      branch,
      ...(rawProject as RawProject),
    };
    projects.push(project);
  }
  return projects;
}
