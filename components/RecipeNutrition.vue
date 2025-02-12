<script setup lang="ts">
import type { Recipe } from '@/types/recipe.types.js';

const props = defineProps<{ nutrition: Recipe['nutrition'] }>();

const calories = computed(() =>
  props.nutrition.nutrients.find((item) => item.name === 'Calories')
);
const macros = computed(() => {
  const { nutrients } = props.nutrition;
  const fat = nutrients.find((item) => item.name === 'Fat');
  const carbs = nutrients.find((item) => item.name === 'Carbohydrates');
  const protein = nutrients.find((item) => item.name === 'Protein');
  return [fat, carbs, protein].map((item) => {
    if (item) item.amount = item.amount ? Math.floor(item.amount) : 0;
    return item;
  });
});
</script>
<template>
  <article
    class="flex flex-col items-center bg-white border-2 border-primary-700 rounded-2xl p-4 gap-2"
  >
    <section class="flex justify-center">
      <div class="flex items-baseline gap-1">
        <span class="text-primary-700 font-bold text-xl">
          {{ Math.floor(calories?.amount || 0) }}
        </span>
        <span class="text-sm font-medium text-neutral-500">calories</span>
      </div>
    </section>
    <section class="grid grid-cols-3 gap-2">
      <div
        v-for="macro in macros"
        :key="macro?.name"
        class="flex flex-col justify-center items-center rounded-lg p-2 aspect-square bg-primary-50"
      >
        <span class="text-primary-700 font-semibold">
          <span class="text-lg">{{ macro?.amount }}</span>
          <span class="text-xs">{{ macro?.unit }}</span>
        </span>
        <span class="text-xs text-neutral-600">
          {{ macro?.name === 'Carbohydrates' ? 'Carbs' : macro?.name }}
        </span>
      </div>
    </section>
    <section>
      <p class="italic text-xs text-neutral-500">
        Per {{ nutrition.weight_per_serving.amount
        }}{{ nutrition.weight_per_serving.unit }} serving
      </p>
    </section>
  </article>
</template>
