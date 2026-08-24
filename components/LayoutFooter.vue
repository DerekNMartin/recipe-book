<script setup lang="ts">
import useAuth from '@/composables/useAuth';

const { isAuthenticated, useSignOut } = useAuth();
</script>

<template>
  <footer
    class="flex flex-1 place-content-end w-full justify-between border-t-2 border-solid border-primary-700 items-center sm:py-8 sm:px-12 p-6 print:hidden"
  >
    <p>Made by Derek Martin</p>
    <Button v-if="isAuthenticated" outlined @click="useSignOut" size="small" label="Sign Out" />
  </footer>
</template>
