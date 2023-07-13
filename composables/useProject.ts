import { Project, BuildInfo } from "guizhan-builds-2-data";
import _ from "lodash";

export async function useProjectRepository(author: string, repository: string): Promise<Ref<Project[] | null>> {
  const projects = await useProjects();
  if (!projects.value) {
    return ref(null);
  }
  return ref(projects.value.filter((project) => project.author === author && project.repository === repository));
}

export async function useProject(author: string, repository: string, branch: string): Promise<Ref<Project | null>> {
  const projects = await useProjects();
  if (!projects.value) {
    console.log("no projects");
    return ref(null);
  }
  return ref(
    projects.value.find((p) => {
      if (p.author === author && p.repository === repository && p.branch === branch) {
        return true;
      }
      if (_.isArray(p.alias)) {
        return p.alias.find((alias: string) => `${author}/${repository}:${branch}` === alias);
      }
      return false;
    }) || null
  );
}

export async function useBuild(project: Project, buildId: number): Promise<Ref<BuildInfo | null>> {
  const builds = await useBuilds(project);
  if (!builds.value) {
    return ref(null);
  }
  return ref(builds.value.builds.find((build) => build.id === buildId) || null);
}

export async function useLatestBuild(project: Project): Promise<Ref<BuildInfo | null>> {
  const builds = await useBuilds(project);
  if (!builds.value) {
    return ref(null);
  }
  return ref(_.last(builds.value.builds) || null);
}

export async function useLatestSuccessfulBuild(project: Project): Promise<Ref<BuildInfo | null>> {
  const builds = await useBuilds(project);
  if (!builds.value) {
    return ref(null);
  }
  return ref(builds.value.builds.findLast((build) => build.success) || null);
}
