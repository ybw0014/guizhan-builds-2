import type { Project, BuildInfo } from 'guizhan-builds-2-types';
import _ from 'lodash';

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

/**
 * 获取项目指定构建版本的要求
 * @param project 项目
 * @param before 构建版本
 * @returns 该版本的运行需求
 */
export function useProjectRequirements(project: Project, before: number = 0): Map<string, string> {
  const result: Map<string, string> = new Map();
  if (!project.displayOptions?.requirements) {
    return result;
  }
  for (const [key, value] of Object.entries(project.displayOptions?.requirements)) {
    const latestVer =
      _.max(
        _.filter(Object.keys(value), (val) => {
          if (before === 0) {
            return true;
          }
          return parseInt(val) <= before;
        })
      ) || 1;
    result.set(key, value[latestVer]);
  }
  return result;
}
