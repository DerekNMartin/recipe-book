<script setup lang="ts">
/**
 * TODO/ideas:
 * - upload image from desktop/url
 * - upload image and date when made/eaten
 */
</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<style>
body {
  font-family: 'Montserrat', sans-serif;
  overflow-y: scroll !important;
}

p,
h1,
h2,
h3 {
  @apply text-primary-700;
}

h1,
h2,
h3 {
  font-family: 'Climate Crisis', sans-serif;
}

button.p-button {
  @apply print:hidden;
}

.p-button-label {
  font-family: 'Montserrat', sans-serif;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.page-transition-enter-active,
.page-transition-leave-active {
  transition: all 0.2s;
}
.page-transition-enter-from,
.page-transition-leave-to {
  opacity: 0;
  filter: blur(0.5rem);
}
</style>
