<script setup lang="ts">
const router = useRouter();

const newRecipe = reactive({
  title: {
    value: '',
    inputType: 'text',
    label: 'Title',
  },
  author: {
    value: '',
    inputType: 'text',
    label: 'Author',
  },
  image_url: {
    value: '',
    inputType: 'text',
    label: 'Image URL',
  },
  original_url: {
    value: '',
    inputType: 'text',
    label: 'Original URL',
  },
  description: {
    value: '',
    inputType: 'textArea',
    label: 'Description',
  },
  ingredients: {
    value: [],
    newValue: '',
    inputType: 'listText',
    listType: 'bullet',
    buttonLabel: 'Add Ingredient',
    label: 'Ingredients',
  },
  preparation: {
    value: [],
    newValue: '',
    inputType: 'listTextArea',
    listType: 'decimal',
    buttonLabel: 'Add Step',
    label: 'Preparation',
  },
  notes: {
    value: [],
    newValue: '',
    inputType: 'listTextArea',
    listType: 'none',
    buttonLabel: 'Add Note',
    label: 'Notes',
  },
});

async function addRecipe() {
  const payload = Object.keys(newRecipe).reduce<
    Record<string, string | string[]>
  >((acc, curr) => {
    acc[curr] = newRecipe[curr as keyof typeof newRecipe].value;
    return acc;
  }, {});
  await $fetch('/api/recipes', {
    method: 'post',
    body: {
      recipe: payload,
    },
  });
  router.replace('/');
}
</script>

<template>
  <div class="flex flex-col gap-6">
    <div
      v-for="(input, key) in newRecipe"
      :id="key"
      class="flex flex-col gap-1"
    >
      <label class="text-primary-700 font-bold text-sm uppercase" :for="key">{{
        input.label
      }}</label>
      <template
        v-if="input.inputType === 'text' && typeof input.value === 'string'"
      >
        <InputText :id="key" v-model="input.value" />
      </template>
      <template
        v-else-if="
          input.inputType === 'textArea' && typeof input.value === 'string'
        "
      >
        <Textarea :id="key" v-model="input.value" />
      </template>
      <template
        v-else-if="
          input.inputType === 'listText' || input.inputType === 'listTextArea'
        "
      >
        <InputList
          v-model:items="newRecipe[key].value"
          v-model="newRecipe[key].newValue"
          :button-label="newRecipe[key].buttonLabel"
          :input-type="input.inputType === 'listTextArea' ? 'textarea' : 'text'"
          :list-type="input.listType"
        />
      </template>
    </div>
    <Button label="Create Recipe" @click="addRecipe" icon="pi pi-plus" />
  </div>
</template>
