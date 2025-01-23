<script setup lang="ts">
import { SpeedInsights } from '@vercel/speed-insights/nuxt';
import { Analytics } from '@vercel/analytics/nuxt';
import useAuth from '@/composables/useAuth';

const { isAuthenticated, useSignOut } = useAuth();
const isAuthModalVisible = ref(!isAuthenticated.value);
</script>

<template>
  <main
    class="sm:p-12 p-6 grid grid-rows-[auto,1fr,auto] min-h-screen bg-amber-50 print:p-0"
  >
    <header
      class="flex justify-between mb-8 pb-8 border-b-2 border-solid border-primary-700 print:hidden"
    >
      <NuxtLink to="/" class="group flex items-center gap-1">
        <img
          src="~/assets/logo.svg"
          class="w-10 -rotate-6 group-hover:animate-wiggle"
        />
        <h1 class="text-3xl font-bold text-primary-700">Recipes</h1>
      </NuxtLink>
      <div class="flex gap-4">
        <NuxtLink v-if="isAuthenticated" :to="{ name: 'recipe-new' }">
          <Button icon="pi pi-plus" class="aspect-square" />
        </NuxtLink>
        <NuxtLink v-if="isAuthenticated" :to="{ name: 'recipe-generate' }">
          <Button icon="pi pi-sparkles" class="aspect-square" />
        </NuxtLink>
        <Button v-else @click="isAuthModalVisible = true">Sign In</Button>
      </div>
    </header>
    <slot />
    <footer
      class="flex flex-1 place-content-end mt-8 w-full justify-between border-t-2 border-solid border-primary-700 pt-6 items-center"
    >
      <p>Made by Derek Martin</p>
      <Button
        v-if="isAuthenticated"
        outlined
        @click="useSignOut"
        size="small"
        label="Sign Out"
      />
    </footer>

    <AuthModal v-model:visible="isAuthModalVisible" />
    <SpeedInsights />
    <Analytics />
    <BaseToast />
  </main>
</template>
