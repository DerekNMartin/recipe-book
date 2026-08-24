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
  <div v-if="recipe" class="flex flex-col">
    <!-- HEADING SECTION -->
    <section class="flex flex-col items-center sm:gap-12 print:gap-8 gap-8 sm:py-8 sm:px-12 p-6">
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
      <div class="max-h-64 max-w-64 rounded-3xl border-2 border-primary-700 p-2">
        <NuxtImg
          :src="recipe.image_url || undefined"
          fit="cover"
          width="500"
          format="webp"
          class="rounded-2xl aspect-square object-cover"
          :alt="recipe.title || undefined"
        />
      </div>
      <div class="print:hidden">
        <Rating v-model="recipeRating" class="flex gap-1" />
      </div>
      <RecipeNutrition class="print:hidden" :nutrition="recipe.nutrition" />
    </section>
    <!-- DESCRIPTION SECTION -->
    <section class="flex flex-col gap-6 items-center border-y-2 border-primary-700 sm:py-8 p-6">
      <p class="sm:text-xl text-center print:text-base sm:w-2/3">
        {{ recipe.description }}
      </p>
    </section>
    <section class="grid sm:grid-cols-[1fr,2fr] grid-cols-1 sm:gap-8 print:grid-cols-1">
      <RecipeIngredients
        class="p-6 sm:px-8 print:px-0"
        :ingredients="recipe.ingredients"
        @save="saveChanges"
      />
      <RecipePreparation
        class="sm:border-l-2 sm:border-t-0 border-t-2 border-solid border-primary-700 p-6 sm:px-8 print:border-l-0 print:pt-8 print:px-0 print:border-t-2"
        :steps="recipe.preparation"
        @save="saveChanges"
      />
    </section>
    <RecipeNotes
      class="border-t-2 border-solid border-primary-700 p-6 sm:p-8 print:px-0"
      :notes="recipe.notes"
      @save="saveChanges"
    />
    <section class="flex justify-between p-6 sm:px-8 print:px-0" v-if="isAuthenticated">
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
