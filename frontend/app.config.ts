export default defineAppConfig({
  ui: {
    primary: 'blue',
    gray: 'neutral',
    popover: {
      ring: 'border-t-2 border-primary-500 py-1'
    }
  },
  projectSortTypes: ['name', 'newest', 'updated'],
  projectFilters: [
    {
      id: 'server',
      type: 'single',
      i18n: true,
      values: ['spigot', 'paper']
    },
    {
      id: 'mcVersion',
      type: 'single',
      i18n: false,
      values: [] // 将在运行时填充
    }
  ]
});
