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
    header="Sign In to Edit"
  >
    <div class="flex flex-col gap-4">
      <p class="text-sm text-neutral-500">
        If you'd like to edit content, please sign in.
      </p>
      <form @submit.prevent="handleSignIn" class="flex flex-col gap-4">
        <div class="flex flex-col gap-1">
          <label for="email" class="font-semibold text-sm">Email</label>
          <InputText v-model="email" id="email" type="email" />
        </div>
        <div class="flex flex-col gap-1">
          <label for="password" class="font-semibold text-sm">Password</label>
          <InputText v-model="password" id="password" type="password" />
        </div>
        <Button class="w-full" label="Sign In" type="submit"></Button>
      </form>
      <Transition name="fade">
        <p v-if="errorMessage" class="text-sm text-red-600">
          {{ errorMessage }}
        </p>
      </Transition>
    </div>
  </Dialog>
</template>
