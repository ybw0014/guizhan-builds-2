<template>
  <aside
    role="status"
    class="border-y border-amber-200 bg-amber-100 text-amber-950 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100"
  >
    <div class="mx-2 max-w-screen-xl py-2 text-sm leading-5 sm:mx-auto">
      {{ $t('components.sunsetBanner.text') }}
      <NuxtLink
        :to="{ name: 'sunset' }"
        class="font-semibold underline decoration-amber-500/70 underline-offset-2 transition-colors hover:text-amber-700 hover:decoration-amber-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-600 focus-visible:ring-offset-2 focus-visible:ring-offset-amber-100 dark:decoration-amber-400/70 dark:hover:text-amber-300 dark:hover:decoration-amber-300 dark:focus-visible:ring-amber-400 dark:focus-visible:ring-offset-amber-950"
      >
        {{ $t('components.sunsetBanner.link') }}
      </NuxtLink>
    </div>
  </aside>
</template>
