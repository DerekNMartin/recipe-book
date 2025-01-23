<script setup lang="ts"></script>

<template>
  <Toast position="bottom-center">
    <template #message="slotProps">
      <span class="text-sm">{{ slotProps.message.summary }}</span>
    </template>
  </Toast>
</template>

<style lang="css">
.p-toast-message-content {
  @apply justify-between !items-center;
}
button.p-toast-close-button {
  @apply m-0 right-0;
}
</style>
