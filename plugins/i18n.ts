import { defineNuxtPlugin } from '#imports'

export default defineNuxtPlugin((nuxtApp) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  nuxtApp.hook('i18n:localeSwitched', ({ oldLocale, newLocale }) => {
    refreshNuxtData()
  })
})
