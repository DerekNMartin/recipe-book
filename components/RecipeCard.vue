<script setup lang="ts">
import type { Recipe } from '@/types/recipe.types.js';
import type { RecipesGet } from '~/server/api/recipes.get';

defineProps<{ recipe: Recipe | RecipesGet[number] }>();
</script>

<template>
  <article
    class="rounded-2xl overflow-hidden flex flex-col justify-end h-full max-h-96 transition-transform aspect-[4/3] group hover:rotate-1 duration-300 origin-bottom-right bg-primary-700"
  >
    <NuxtLink
      :to="{ name: 'recipe-recipeId', params: { recipeId: recipe.id } }"
      class="w-full h-full p-3 overflow-hidden"
    >
      <NuxtImg
        :src="recipe.image_url || undefined"
        fit="cover"
        width="500"
        format="webp"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300 rounded-xl"
        :alt="recipe.title || undefined"
      />
    </NuxtLink>
    <div class="flex flex-col gap-1 px-4 pb-4 bg-primary-700 z-10">
      <NuxtLink :to="{ name: 'recipe-recipeId', params: { recipeId: recipe.id } }">
        <h3 class="text-xl text-white">{{ recipe.title }}</h3>
      </NuxtLink>
      <span class="flex items-center gap-2">
        <span class="w-6 h-[2px] bg-white block rounded" />
        <p class="text-sm font-medium text-white">By {{ recipe.author }}</p>
      </span>
    </div>
  </article>
</template>
