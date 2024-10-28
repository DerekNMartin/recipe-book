<script setup lang="ts">
import type { Recipe } from '@/server/api/recipes.get';
defineProps<{ recipe: Recipe }>();
</script>

<template>
  <NuxtLink :to="{ name: 'recipe-recipeId', params: { recipeId: recipe.id } }">
    <article
      class="rounded-xl border-2 border-solid border-primary-700 overflow-hidden flex flex-col justify-end h-full"
    >
      <img :src="recipe.image_url || ''" class="w-full h-full object-cover" />
      <div class="border-t-2 border-solid border-primary-700 p-4 bg-white">
        <h3 class="text-lg">{{ recipe.title }}</h3>
      </div>
    </article>
  </NuxtLink>
</template>
