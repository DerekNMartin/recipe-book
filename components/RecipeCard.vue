<script setup lang="ts">
import type { Recipe } from '@/server/api/recipes.get';
const props = defineProps<{ recipe: Recipe }>();
</script>

<template>
  <NuxtLink :to="{ name: 'recipe-recipeId', params: { recipeId: recipe.id } }">
    <article
      class="rounded-xl border-2 border-solid border-primary-700 overflow-hidden flex flex-col justify-end h-full max-h-96"
    >
      <NuxtImg
        :src="recipe.image_url || undefined"
        fit="cover"
        width="auto"
        height="500"
        format="webp"
        class="object-cover w-full h-full"
        :alt="recipe.title || undefined"
      />
      <div class="border-t-2 border-solid border-primary-700 p-4 bg-white">
        <h3 class="text-lg">{{ recipe.title }}</h3>
      </div>
    </article>
  </NuxtLink>
</template>
