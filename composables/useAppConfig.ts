export function useProjectSortTypes() {
  const appConfig = useAppConfig();
  return ref(appConfig.projectSortTypes);
}

export async function useProjectFilters() {
  const appConfig = useAppConfig();
  const mcVersions = await useMinecraftVersions();
  const filters = appConfig.projectFilters.map((filter) => {
    if (filter.id === "mcVersion") {
      filter.values = mcVersions.value || [];
    }
    return filter;
  });
  return ref(filters);
}
