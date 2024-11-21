<script setup lang="ts">
import useAuth from '@/composables/useAuth';

const { useSignIn } = useAuth();

const isVisible = defineModel('visible', { default: false });

const email = ref('');
const password = ref('');
const errorMessage = ref('');

async function handleSignIn() {
  errorMessage.value = '';
  const { error } = await useSignIn(email.value, password.value);
  if (error) {
    errorMessage.value = error.message;
  } else {
    isVisible.value = false;
  }
}
</script>

<template>
  <Dialog
    pt:mask:class="backdrop-blur-sm"
    dismissableMask
    :draggable="false"
    v-model:visible="isVisible"
    modal
    header="Sign In"
  >
    <div class="flex flex-col gap-4 mb-8">
      <p class="text-sm text-neutral-500">
        If you'd like to edit content, please sign in.
      </p>
      <div class="flex items-center gap-4">
        <label for="email" class="font-semibold w-24">Email</label>
        <InputText
          v-model="email"
          id="email"
          class="flex-auto"
          autocomplete="off"
          type="email"
        />
      </div>
      <div class="flex items-center gap-4">
        <label for="password" class="font-semibold w-24">Password</label>
        <InputText
          v-model="password"
          id="password"
          class="flex-auto"
          autocomplete="off"
          type="password"
        />
      </div>
      <p v-if="errorMessage" class="text-sm text-red-600">
        {{ errorMessage }}
      </p>
    </div>
    <Button
      class="w-full"
      type="button"
      label="Sign In"
      @click="handleSignIn"
    ></Button>
  </Dialog>
</template>
