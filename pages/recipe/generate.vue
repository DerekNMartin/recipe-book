<script setup lang="ts">
const myIngredientsInput = ref('');

const recipe = reactive<Record<string, string[] | string>>({
  title: '',
  description: '',
  ingredients: [],
  preparation: [],
});

const recipeString = ref('');

function parseRecipe(response: string) {
  const regex = /\{.*\}/s;
  const match = response?.match(regex);
  if (match?.length) {
    const recipeObject = JSON.parse(match[0]);
    recipe.title = recipeObject.title;
    recipe.description = recipeObject.description;
    recipe.ingredients = recipeObject.ingredients;
    recipe.preparation = recipeObject.instructions;
  } else {
    recipeString.value = response as string;
  }
}

const isLoading = ref(false);
async function handleGenerateRecipe() {
  const myIngredients = myIngredientsInput.value
    .split(',')
    .map((word) => word.trim());
  try {
    isLoading.value = true;
    const response = await $fetch('/api/recipes/generate', {
      method: 'post',
      body: { ingredients: myIngredients },
    });
    parseRecipe(response as string);
  } catch (error) {
    console.error(error);
  } finally {
    isLoading.value = false;
  }
}
</script>
<template>
  <div class="flex flex-col gap-8">
    <div class="flex flex-col gap-2">
      <label for="myIngredientsInput">
        List some ingredients you have on-hand:
      </label>
      <Textarea id="myIngredientsInput" v-model="myIngredientsInput" />
      <Button
        @click="handleGenerateRecipe"
        :loading="isLoading"
        label="Generate Recipe"
        icon="pi pi-sparkles"
      />
    </div>
    <div v-if="recipe.ingredients.length && recipe.preparation.length">
      <section
        class="flex flex-col items-center border-b-2 border-solid border-primary-700 py-8 mb-8"
      >
        <h2 class="text-5xl font-bold leading-[3.5rem] text-center mb-6">
          {{ recipe.title }}
        </h2>
        <p class="sm:text-xl text-center print:text-base max-w-lg">
          {{ recipe.description }}
        </p>
      </section>
      <div
        class="grid sm:grid-cols-[1fr,2fr] grid-cols-1 sm:px-8 gap-8 print:grid-cols-1 print:px-0"
      >
        <RecipeIngredients
          :editable="false"
          :ingredients="
            typeof recipe.ingredients !== 'string' ? recipe.ingredients : null
          "
        />
        <RecipePreparation
          :editable="false"
          class="sm:border-l-2 sm:border-t-0 border-t-2 border-solid border-primary-700 sm:pl-8 pt-8 sm:pt-0 print:border-l-0 print:pt-8 print:pl-0 print:border-t-2"
          :steps="
            typeof recipe.preparation !== 'string' ? recipe.preparation : null
          "
        />
      </div>
    </div>
    <div v-else-if="recipeString">
      {{ recipeString }}
    </div>
  </div>
</template>
