<script setup lang="ts">
import useAuth from '@/composables/useAuth';

const { isAuthenticated, useSignOut } = useAuth();
const isAuthModalVisible = ref(!isAuthenticated.value);
</script>

<template>
  <main
    class="sm:p-12 p-6 grid grid-rows-[auto,1fr,auto] min-h-screen bg-yellow-50 print:p-0"
  >
    <header
      class="flex justify-between mb-8 pb-8 border-b-2 border-solid border-primary-700"
    >
      <NuxtLink to="/">
        <h1 class="text-3xl font-bold text-primary-700">Recipes</h1>
      </NuxtLink>
      <div class="flex gap-4">
        <NuxtLink v-if="isAuthenticated" :to="{ name: 'recipe-new' }">
          <Button label="Recipe" icon="pi pi-plus" />
        </NuxtLink>
        <NuxtLink v-if="isAuthenticated" :to="{ name: 'recipe-generate' }">
          <Button label="Generate" icon="pi pi-sparkles" />
        </NuxtLink>
        <Button v-else @click="isAuthModalVisible = true">Sign In</Button>
      </div>
    </header>
    <slot />
    <footer
      class="flex flex-1 place-content-end mt-8 w-full justify-between border-t-2 border-solid border-primary-700 pt-6"
    >
      <p>Made by Derek Martin</p>
      <Button v-if="isAuthenticated" outlined @click="useSignOut"
        >Sign Out</Button
      >
    </footer>
    <AuthModal v-model:visible="isAuthModalVisible" />
  </main>
</template>
