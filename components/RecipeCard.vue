<script setup lang="ts">
import type { Recipe } from '@/types/recipe.types.js';
import type { RecipesResponse } from '~/server/api/recipes.get';

const props = defineProps<{ recipe: Recipe | RecipesResponse[number] }>();
</script>

<template>
  <NuxtLink :to="{ name: 'recipe-recipeId', params: { recipeId: recipe.id } }">
    <article
      class="rounded-xl border-2 border-solid border-primary-700 overflow-hidden flex flex-col justify-end h-full max-h-96 transition-transform aspect-[4/3] group hover:rotate-1 duration-300 origin-bottom-right"
    >
      <NuxtImg
        :src="recipe.image_url || undefined"
        fit="cover"
        width="500"
        format="webp"
        class="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
        :alt="recipe.title || undefined"
      />
      <div class="flex flex-col gap-1 p-4 bg-white z-10">
        <h3>{{ recipe.title }}</h3>
        <span class="flex items-center gap-2">
          <span class="w-6 h-[2px] bg-primary-700 block rounded" />
          <p class="text-sm text-neutral-700 font-medium">
            By {{ recipe.author }}
          </p>
        </span>
      </div>
    </article>
  </NuxtLink>
</template>
