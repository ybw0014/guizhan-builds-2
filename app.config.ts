export default defineAppConfig({
  ui: {
    primary: "sky",
    gray: "neutral"
  },
  projectSortTypes: ["name", "newest", "updated"],
  projectFilters: [
    {
      id: "server",
      type: "single",
      i18n: true,
      values: ["spigot", "paper"]
    },
    {
      id: "mcVersion",
      type: "single",
      i18n: false,
      values: [] // 将在运行时填充
    }
  ]
});
