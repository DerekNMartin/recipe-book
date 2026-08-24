<script setup lang="ts">
import { Analytics } from '@vercel/analytics/nuxt';
</script>

<template>
  <main class="grid grid-rows-[auto,1fr,auto] min-h-screen bg-amber-50 print:p-0">
    <LayoutHeader />
    <slot />
    <LayoutFooter />
    <AuthModal />
    <Analytics />
    <BaseToast />
  </main>
</template>
