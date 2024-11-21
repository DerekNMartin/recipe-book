<script setup lang="ts">
import useAuth from '@/composables/useAuth';

const route = useRoute();
const router = useRouter();
const { isAuthenticated } = useAuth();

const recipeId = computed(() => route.params.recipeId);

const { data: recipe } = useFetch(`/api/recipes/${recipeId.value}`);

// TODO: Add confirmation
async function deleteRecipe() {
  await $fetch(`/api/recipes/${recipeId.value}`, {
    method: 'delete',
  });
  router.replace('/');
}

async function saveChanges(editedRecipeSection: Partial<typeof recipe.value>) {
  const editRecipePayload = { ...recipe.value, ...editedRecipeSection };
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
      <img :src="recipe.image_url || ''" class="rounded-3xl max-h-64" />
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
      <p class="text-xl text-center">{{ recipe.description }}</p>
    </section>
    <div class="grid sm:grid-cols-[1fr,2fr] grid-cols-1 sm:px-8 gap-8">
      <RecipeIngredients
        :ingredients="recipe.ingredients"
        @save="saveChanges"
      />
      <RecipePreparation
        class="sm:border-l-2 sm:border-b-0 border-b-2 border-solid border-primary-700 sm:pl-8 pb-8 sm:pb-0"
        :steps="recipe.preparation"
        @save="saveChanges"
      />
    </div>
    <RecipeNotes :notes="recipe.notes" @save="saveChanges" />
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
