<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
import { Analytics } from '@vercel/analytics/nuxt';
import useAuth from '@/composables/useAuth';

const { isAuthenticated } = useAuth();
const isAuthModalVisible = ref(!isAuthenticated.value);
</script>

<template>
  <main
    class="sm:p-12 p-6 grid grid-rows-[auto,1fr,auto] min-h-screen bg-amber-50 print:p-0"
  >
    <LayoutHeader />
    <slot />
    <LayoutFooter />
    <AuthModal v-model:visible="isAuthModalVisible" />
    <SpeedInsights />
    <Analytics />
    <BaseToast />
  </main>
</template>
