<script setup lang="ts">
import type { RecipesGet, RecipesResponse } from '~/server/api/recipes.get';

const searchValue = ref('');
const debouncedSearchValue = refDebounced(searchValue, 500);

const currentPage = ref(0);
const totalRecipeCount = ref(0);
const allRecipes = ref<RecipesGet>([]);
const { data: recipesResult, status } = useFetch('/api/recipes', {
  query: { page: currentPage, search: debouncedSearchValue },
  watch: [currentPage, debouncedSearchValue],
});
const isLoading = computed(() => status.value === 'pending');

const { arrivedState } = useScroll(window);
const hasMore = computed(() => allRecipes.value.length < totalRecipeCount.value);
function fetchNext() {
  currentPage.value++;
}
watch(arrivedState, () => {
  if (arrivedState.bottom && hasMore.value && !isLoading.value) fetchNext();
});

watch(
  recipesResult,
  (newResult: RecipesResponse) => {
    if (!newResult) return;
    if (currentPage.value === 0) {
      // If we are on the first page (or searching), REPLACE the list
      allRecipes.value = newResult.recipes;
    } else {
      // If we are on page 1+, APPEND to the list
      allRecipes.value.push(...newResult.recipes);
    }

    totalRecipeCount.value = newResult.meta.total;
  },
  { immediate: true }
);
</script>

<template>
  <div class="flex flex-col gap-8">
    <section class="sticky top-0 py-2 bg-amber-50 z-20">
      <InputText class="w-full" type="text" v-model="searchValue" placeholder="Search recipes..." />
    </section>
    <TransitionGroup
      name="fade"
      tag="section"
      class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-6 h-fit"
    >
      <RecipeCard :recipe="recipe" v-for="recipe in allRecipes" :key="recipe.id" />
    </TransitionGroup>
    <Transition>
      <p v-if="allRecipes.length === 0 && debouncedSearchValue" class="text-center text-gray-400">
        No recipes found for "{{ debouncedSearchValue }}"
      </p>
    </Transition>
    <Transition>
      <p v-if="!hasMore && allRecipes.length" class="text-center text-gray-400 my-8">
        All Recipes Loaded
      </p>
    </Transition>
  </div>
</template>
