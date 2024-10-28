<script setup lang="ts">
const { data: recipes } = await useFetch('/api/recipes');
</script>

<template>
  <section class="grid sm:grid-cols-3 lg:grid-cols-4 grid-cols-1 gap-4 h-fit">
    <RecipeCard :recipe="recipe" v-for="recipe in recipes" :key="recipe.id" />
  </section>
</template>
