<script setup lang="ts">
const { auth } = useSupabaseClient();

const isVisible = defineModel('visible', { default: false });

const email = ref('');
const password = ref('');

async function handleCreateAccount() {
  const { data, error } = await auth.signUp({
    email: email.value,
    password: password.value,
  });
  isVisible.value = false;
}
</script>

<template>
  <Dialog
    v-model:visible="isVisible"
    modal
    header="Create Account"
    :style="{ width: '25rem' }"
  >
    <h3 class="text-surface-500 dark:text-surface-400 block mb-8">
      Create Account
    </h3>
    <div class="flex items-center gap-4 mb-4">
      <label for="email" class="font-semibold w-24">Email</label>
      <InputText
        v-model="email"
        id="email"
        class="flex-auto"
        autocomplete="off"
        type="email"
      />
    </div>
    <div class="flex items-center gap-4 mb-8">
      <label for="password" class="font-semibold w-24">Password</label>
      <InputText
        v-model="password"
        id="password"
        class="flex-auto"
        autocomplete="off"
        type="password"
      />
    </div>
    <div class="flex justify-end gap-2">
      <Button
        type="button"
        label="Cancel"
        severity="secondary"
        @click="isVisible = false"
      ></Button>
      <Button
        type="button"
        label="Create"
        @click="handleCreateAccount"
      ></Button>
    </div>
  </Dialog>
</template>
