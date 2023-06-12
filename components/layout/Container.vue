<template>
  <div class="page-container">
    <div class="container">
      <slot></slot>
    </div>
  </div>
</template>

<style scoped lang="scss">
.page-container {
  @apply flex justify-center min-h-[85vh];
}
</style>
