<script setup lang="ts">
import type { RecipesGet } from '~/server/api/recipes.get';

const currentPage = ref(0);
const totalRecipeCount = ref(0);
const allRecipes = ref<RecipesGet>([]);
const { data: recipesResult } = await useFetch('/api/recipes', {
  query: { page: currentPage },
});

const hasMore = computed(() => allRecipes.value.length < totalRecipeCount.value);

function fetchNext() {
  currentPage.value++;
}

watchEffect(() => {
  if (recipesResult.value) {
    allRecipes.value = [...allRecipes.value, ...recipesResult.value.recipes];
    totalRecipeCount.value = recipesResult.value.meta.total;
  }
});
</script>

<template>
  <div class="flex flex-col gap-8">
    <TransitionGroup
      name="fade"
      tag="section"
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-6 h-fit"
    >
      <RecipeCard :recipe="recipe" v-for="recipe in allRecipes" :key="recipe.id" />
    </TransitionGroup>
    <section v-if="hasMore" class="flex justify-center">
      <Button outlined @click="fetchNext()">Load More</Button>
    </section>
  </div>
</template>
