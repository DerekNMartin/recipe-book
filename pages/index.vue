<script setup lang="ts">
const { data: recipes } = await useFetch('/api/recipes');
</script>

<template>
  <section
    class="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 grid-cols-1 gap-6 h-fit"
  >
    <RecipeCard :recipe="recipe" v-for="recipe in recipes" :key="recipe.id" />
  </section>
</template>
