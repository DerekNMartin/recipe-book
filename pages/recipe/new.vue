<script setup lang="ts">
const router = useRouter();

const newRecipe = reactive({
  title: {
    value: '',
    label: 'Title',
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

function setNewRecipeValue(
  key: keyof typeof newRecipe,
  value: string | string[] | undefined
) {
  if (value) newRecipe[key].value = value;
}

const isLoadingMetadata = ref(false);
async function handleAutoFill() {
  if (!newRecipe.original_url.value) return;
  try {
    isLoadingMetadata.value = true;
    const metadata = await $fetch('/api/metadata', {
      query: { url: newRecipe.original_url.value },
    });
    setNewRecipeValue('title', metadata?.title);
    setNewRecipeValue('author', metadata?.author);
    setNewRecipeValue('image_url', metadata?.image);
    setNewRecipeValue('original_url', metadata?.url);
    setNewRecipeValue('description', metadata?.description);
    setNewRecipeValue('ingredients', metadata?.ingredients);
    setNewRecipeValue('preparation', metadata?.preparation);
  } catch (error) {
    console.log(error);
  } finally {
    isLoadingMetadata.value = false;
  }
}

const canCreateRecipe = computed(() => {
  return (
    newRecipe.title &&
    newRecipe.ingredients.value.length > 0 &&
    newRecipe.preparation.value.length > 0
  );
});
</script>

<template>
  <div>
    <section class="flex flex-col gap-4 items-center mb-8">
      <Transition name="fade">
        <h2
          v-if="newRecipe.title.value"
          class="text-5xl font-bold leading-[3.5rem] text-center"
        >
          {{ newRecipe.title.value }}
        </h2>
      </Transition>
      <Transition name="fade">
        <NuxtImg
          v-if="newRecipe.image_url.value"
          :src="newRecipe.image_url.value"
          fit="cover"
          height="500"
          format="webp"
          class="rounded-3xl max-h-64"
          :alt="newRecipe.title.value || undefined"
        />
      </Transition>
      <Button
        label="Create Recipe"
        @click="addRecipe"
        :disabled="!canCreateRecipe"
        icon="pi pi-plus"
      />
    </section>
    <div class="grid md:grid-cols-[1fr,2fr] grid-cols-1 gap-4">
      <section class="recipe-input-section max-h-fit">
        <div class="recipe-input-container w-full">
          <label class="recipe-input__label">
            {{ newRecipe.original_url.label }}
          </label>
          <div class="flex gap-2">
            <InputText class="w-full" v-model="newRecipe.original_url.value" />
            <Button
              class="aspect-square min-w-10"
              title="Autofill recipe details from metadata"
              icon="pi pi-sparkles"
              :disabled="!Boolean(newRecipe.original_url.value)"
              :loading="isLoadingMetadata"
              @click="handleAutoFill()"
            />
          </div>
        </div>
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
            {{ newRecipe.description.label }}
          </label>
          <Textarea
            v-model="newRecipe.description.value"
            style="field-sizing: content"
          />
        </div>
      </section>
      <div class="flex flex-col gap-4">
        <section class="recipe-input-section">
          <div class="recipe-input-container">
            <label class="recipe-input__label">
              {{ newRecipe.ingredients.label }}
            </label>
            <InputList
              placeholder="Add an ingredient"
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
              placeholder="Add a preparation step"
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
              placeholder="Add a recipe note"
              v-model:items="newRecipe.notes.value"
              v-model="newRecipe.notes.newValue"
              :button-label="newRecipe.notes.buttonLabel"
              input-type="textarea"
            />
          </div>
        </section>
      </div>
    </div>
  </div>
</template>

<style lang="css">
.recipe-input-section {
  @apply sm:p-6 p-4 rounded-lg flex flex-col gap-6 bg-white border-2 border-solid border-primary-700;
}

.recipe-input-container {
  @apply flex flex-col gap-1;
}
.recipe-input__label {
  @apply text-primary-700 text-xs font-bold uppercase;
}
</style>
