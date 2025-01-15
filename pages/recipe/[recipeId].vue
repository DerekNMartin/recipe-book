<script setup lang="ts">
import useAuth from '@/composables/useAuth';
import type { Recipe } from '~/server/api/recipes/[recipeId].get';

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
</script>

<template>
  <div v-if="recipe" class="flex flex-col gap-8">
    <section class="flex flex-col items-center gap-12">
      <h2 class="text-5xl font-bold leading-[3.5rem] text-center">
        {{ recipe.title }}
      </h2>
      <img
        :src="recipe.image_url || ''"
        class="rounded-3xl max-h-64 aspect-square object-cover"
      />
      <Rating v-model="recipeRating" class="flex gap-1" />
      <div class="flex gap-2">
        <p>{{ recipe.author }}</p>
        <a
          v-if="recipe.original_url"
          :href="recipe.original_url"
          class="border-l border-solid border-primary-700 pl-2 hover:underline"
          target="_blank"
        >
          <p>
            Original
            <i class="pi pi-external-link text-xs" />
          </p>
        </a>
      </div>
    </section>
    <section class="border-y-2 border-solid border-primary-700 py-8">
      <p class="sm:text-xl text-center print:text-base">
        {{ recipe.description }}
      </p>
    </section>
    <div
      class="grid sm:grid-cols-[1fr,2fr] grid-cols-1 sm:px-8 gap-8 print:grid-cols-1 print:px-0"
    >
      <RecipeIngredients
        :ingredients="recipe.ingredients"
        @save="saveChanges"
      />
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
    <section class="flex" v-if="isAuthenticated">
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
