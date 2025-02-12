<script setup lang="ts">
import useAuth from '@/composables/useAuth';

const { isAuthenticated, useSignOut } = useAuth();
</script>

<template>
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
</template>
