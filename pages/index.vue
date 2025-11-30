<script setup lang="ts">
import type { RecipesGet, RecipesResponse } from '~/server/api/recipes.get';

const searchValue = ref('');
const debouncedSearchValue = refDebounced(searchValue, 500);

const currentPage = ref(0);
const totalRecipeCount = ref(0);
const allRecipes = ref<RecipesGet>([]);
const { data: recipesResult } = useFetch('/api/recipes', {
  query: { page: currentPage, search: debouncedSearchValue },
  watch: [currentPage, debouncedSearchValue],
});

const hasMore = computed(() => allRecipes.value.length < totalRecipeCount.value);

function fetchNext() {
  currentPage.value++;
}

// 4. Handle Data Arrival
watch(
  recipesResult,
  (newResult: RecipesResponse) => {
    if (!newResult) return;
    if (currentPage.value === 0) {
      // If we are on the first page (or searching), REPLACE the list
      allRecipes.value = newResult.recipes;
    } else {
      // If we are on page 1+, APPEND to the list
      allRecipes.value = [...allRecipes.value, ...newResult.recipes];
    }

    totalRecipeCount.value = newResult.meta.total;
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col gap-8">
    <InputText type="text" v-model="searchValue" placeholder="Search recipes..." />
    <TransitionGroup
      name="fade"
      tag="section"
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-6 h-fit"
    >
      <RecipeCard :recipe="recipe" v-for="recipe in allRecipes" :key="recipe.id" />
    </TransitionGroup>
    <div v-if="allRecipes.length === 0 && debouncedSearchValue" class="text-center text-gray-500">
      No recipes found for "{{ debouncedSearchValue }}"
    </div>
    <section v-if="hasMore" class="flex justify-center">
      <Button outlined @click="fetchNext()">Load More</Button>
    </section>
  </div>
</template>
