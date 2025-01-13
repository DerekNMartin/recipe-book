<script setup lang="ts">
const router = useRouter();

const newRecipe = reactive({
  title: {
    value: '',
    label: 'Recipe Name',
  },
  author: {
    value: '',
    label: 'Author',
  },
  image_url: {
    value: '',
    label: 'Image URL',
  },
  original_url: {
    value: '',
    label: 'Original URL',
  },
  description: {
    value: '',
    label: 'Description',
  },
  ingredients: {
    value: [],
    newValue: '',
    buttonLabel: 'Add Ingredient',
    label: 'Ingredients',
  },
  preparation: {
    value: [],
    newValue: '',
    buttonLabel: 'Add Step',
    label: 'Preparation',
  },
  notes: {
    value: [],
    newValue: '',
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
  <div>
    <div class="grid md:grid-cols-2 grid-cols-1 gap-4">
      <!-- left -->
      <section class="recipe-input-section">
        <div class="recipe-input-container">
          <label class="recipe-input__label">
            {{ newRecipe.title.label }}
          </label>
          <InputText v-model="newRecipe.title.value" />
        </div>
        <div class="recipe-input-container">
          <label class="recipe-input__label">
            {{ newRecipe.author.label }}
          </label>
          <InputText v-model="newRecipe.author.value" />
        </div>
        <div class="recipe-input-container">
          <label class="recipe-input__label">
            {{ newRecipe.image_url.label }}
          </label>
          <InputText v-model="newRecipe.image_url.value" />
        </div>
        <div class="recipe-input-container">
          <label class="recipe-input__label">
            {{ newRecipe.original_url.label }}
          </label>
          <InputText v-model="newRecipe.original_url.value" />
        </div>
        <div class="recipe-input-container">
          <label class="recipe-input__label">
            {{ newRecipe.description.label }}
          </label>
          <Textarea v-model="newRecipe.description.value" />
        </div>
      </section>
      <div class="flex flex-col gap-4">
        <section class="recipe-input-section">
          <div class="recipe-input-container">
            <label class="recipe-input__label">
              {{ newRecipe.ingredients.label }}
            </label>
            <InputList
              v-model:items="newRecipe.ingredients.value"
              v-model="newRecipe.ingredients.newValue"
              :button-label="newRecipe.ingredients.buttonLabel"
              input-type="text"
            />
          </div>
        </section>
        <section class="recipe-input-section">
          <div class="recipe-input-container">
            <label class="recipe-input__label">
              {{ newRecipe.preparation.label }}
            </label>
            <InputList
              v-model:items="newRecipe.preparation.value"
              v-model="newRecipe.preparation.newValue"
              :button-label="newRecipe.preparation.buttonLabel"
              input-type="textarea"
            />
          </div>
        </section>
        <section class="recipe-input-section">
          <div class="recipe-input-container">
            <label class="recipe-input__label">
              {{ newRecipe.notes.label }}
            </label>
            <InputList
              v-model:items="newRecipe.notes.value"
              v-model="newRecipe.notes.newValue"
              :button-label="newRecipe.notes.buttonLabel"
              input-type="textarea"
            />
          </div>
        </section>
      </div>
    </div>
    <section class="flex justify-end mt-8">
      <Button label="Create Recipe" @click="addRecipe" icon="pi pi-plus" />
    </section>
  </div>
</template>

<style lang="css">
.recipe-input-section {
  @apply p-6 rounded-lg flex flex-col gap-6 bg-white border-2 border-solid border-primary-700;
}

.recipe-input-container {
  @apply flex flex-col gap-1;
}
.recipe-input__label {
  @apply text-primary-700 text-xs font-bold uppercase;
}
</style>
