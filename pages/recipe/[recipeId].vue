<script setup lang="ts">
import useAuth from '@/composables/useAuth';
import type { Recipe } from '@/types/recipe.types.js';

const route = useRoute();
const router = useRouter();
const { isAuthenticated } = useAuth();

const recipeId = computed(() => route.params.recipeId);

const { data: recipe } = useFetch<Recipe>(`/api/recipes/${recipeId.value}`);

const recipeRating = computed({
  get() {
    return recipe.value?.rating || 0;
  },
  set(newRating) {
    if (recipe.value) recipe.value.rating = newRating;
    saveChanges({ rating: newRating });
  },
});

// TODO: Add confirmation
async function deleteRecipe() {
  await $fetch(`/api/recipes/${recipeId.value}`, {
    method: 'delete',
  });
  router.replace('/');
}

async function saveChanges(editedRecipeSection: Partial<Recipe>) {
  const editRecipePayload = { ...recipe.value, ...editedRecipeSection };
  recipe.value = editRecipePayload;
  await $fetch(`/api/recipes/${recipeId.value}`, {
    method: 'put',
    body: { recipe: editRecipePayload },
  });
}

function handlePrint() {
  window.print();
}
</script>

<template>
  <div v-if="recipe" class="flex flex-col gap-8">
    <section class="flex flex-col items-center sm:gap-12 print:gap-8 gap-8">
      <RecipeTitle :title="recipe.title" @save="saveChanges" />
      <div class="flex gap-2">
        <p>{{ recipe.author }}</p>
        <a
          v-if="recipe.original_url"
          :href="recipe.original_url"
          class="border-l border-solid border-primary-700 pl-2 hover:underline print:hidden"
          target="_blank"
        >
          <p>
            Original
            <i class="pi pi-external-link text-xs" />
          </p>
        </a>
      </div>
      <NuxtImg
        :src="recipe.image_url || undefined"
        fit="cover"
        width="500"
        format="webp"
        class="rounded-3xl max-h-64 max-w-64 aspect-square object-cover"
        :alt="recipe.title || undefined"
      />
      <div class="print:hidden">
        <Rating v-model="recipeRating" class="flex gap-1" />
      </div>
      <RecipeNutrition :nutrition="recipe.nutrition" />
    </section>
    <section class="flex flex-col gap-6 items-center border-y-2 border-primary-700 py-8">
      <p class="sm:text-xl text-center print:text-base sm:w-2/3">
        {{ recipe.description }}
      </p>
    </section>
    <div class="grid sm:grid-cols-[1fr,2fr] grid-cols-1 sm:px-8 gap-8 print:grid-cols-1 print:px-0">
      <RecipeIngredients :ingredients="recipe.ingredients" @save="saveChanges" />
      <RecipePreparation
        class="sm:border-l-2 sm:border-t-0 border-t-2 border-solid border-primary-700 sm:pl-8 pt-8 sm:pt-0 print:border-l-0 print:pt-8 print:pl-0 print:border-t-2"
        :steps="recipe.preparation"
        @save="saveChanges"
      />
    </div>
    <RecipeNotes
      class="border-t-2 border-solid border-primary-700 pt-8"
      :notes="recipe.notes"
      @save="saveChanges"
    />
    <section class="flex justify-between" v-if="isAuthenticated">
      <Button
        class="w-fit"
        label="Download Recipe"
        outlined
        size="small"
        icon="pi pi-download"
        @click="handlePrint()"
      />
      <Button
        label="Delete Recipe"
        @click="deleteRecipe"
        severity="danger"
        outlined
        size="small"
        class="w-fit"
      />
    </section>
  </div>
</template>
