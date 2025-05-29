<script setup lang="ts">
import useAuth from '@/composables/useAuth';
const { isAuthenticated, isAuthModalVisible } = useAuth();
</script>
<template>
  <header
    class="flex justify-between mb-8 pb-8 border-b-2 border-solid border-primary-700 print:hidden"
  >
    <NuxtLink to="/" class="group flex items-center gap-1">
      <img src="~/assets/logo.svg" class="w-10 -rotate-6 group-hover:animate-wiggle" />
      <h1 class="text-3xl font-bold text-primary-700">Recipes</h1>
    </NuxtLink>
    <div class="flex gap-4">
      <NuxtLink v-if="isAuthenticated" :to="{ name: 'recipe-generate' }">
        <Button icon="pi pi-sparkles" class="aspect-square" />
      </NuxtLink>
      <NuxtLink v-if="isAuthenticated" :to="{ name: 'recipe-new' }">
        <Button icon="pi pi-plus" class="aspect-square" />
      </NuxtLink>
      <Button v-else @click="isAuthModalVisible = true">Sign In</Button>
    </div>
  </header>
</template>
