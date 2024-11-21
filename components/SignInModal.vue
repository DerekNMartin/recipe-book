<script setup lang="ts">
import useAuth from '@/composables/useAuth';

const { useSignIn, useSignUp } = useAuth();

const authType = defineModel<'signIn' | 'signUp'>('type', {
  default: 'signIn',
});
const isSignIn = computed(() => authType.value === 'signIn');
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

async function handleCreateAccount() {
  const { error } = await useSignUp(email.value, password.value);
  if (error) {
    errorMessage.value = error.message;
  } else {
    isVisible.value = false;
  }
}

function changeModalAuthType() {
  authType.value = isSignIn.value ? 'signUp' : 'signIn';
}
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    :header="isSignIn ? 'Sign In' : 'Sign Up'"
    :style="{ width: '25rem' }"
  >
    <div class="flex flex-col gap-4 mb-8">
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
    <div class="flex justify-between gap-2">
      <Button
        :label="isSignIn ? 'Sign Up' : 'Sign In'"
        @click="changeModalAuthType"
        severity="secondary"
      ></Button>
      <Button
        class="flex-1"
        type="button"
        :label="isSignIn ? 'Sign In' : 'Sign Up'"
        @click="isSignIn ? handleSignIn() : handleCreateAccount()"
      ></Button>
    </div>
  </Dialog>
</template>
