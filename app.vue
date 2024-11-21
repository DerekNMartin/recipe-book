<script setup lang="ts">
/**
 * TODO/ideas:
 * - view all recipes
 * - add recipe
 * - edit/edit/rate recipe
 * - upload image from desktop/url
 * - upload image and date when made/eaten
 * - auto-parse copy-pasted ingredients list and steps into array of strings
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
  font-family: 'Permanent Marker', sans-serif;
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
</style>
