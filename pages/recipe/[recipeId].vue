<script setup lang="ts">
const route = useRoute();
const router = useRouter();

const recipeId = computed(() => route.params.recipeId);

const { data: recipe } = useFetch(`/api/recipes/${recipeId.value}`);

// TODO: Add confirmation
async function deleteRecipe() {
  await $fetch(`/api/recipes/${recipeId.value}`, {
    method: 'delete',
  });
  router.replace('/');
}
</script>

<template>
  <div v-if="recipe" class="flex flex-col gap-8">
    <section class="flex flex-col items-center gap-12">
      <h2 class="text-5xl font-bold leading-[3.5rem] text-center">
        {{ recipe.title }}
      </h2>
      <img :src="recipe.image_url || ''" class="rounded-3xl max-h-64" />
      <div class="flex gap-2">
        <p>{{ recipe.author }}</p>
        <a
          v-if="recipe.original_url"
          :href="recipe.original_url"
          class="border-l border-solid border-primary-700 pl-2 hover:underline"
          target="_blank"
        >
          <p>
            Original
            <i class="pi pi-external-link text-xs" />
          </p>
        </a>
      </div>
    </section>
    <section class="border-y-2 border-solid border-primary-700 py-8">
      <p class="text-xl text-center">{{ recipe.description }}</p>
    </section>
    <section class="grid sm:grid-cols-[1fr,2fr] grid-cols-1 sm:px-8 gap-8">
      <div>
        <h3 class="text-2xl mb-4">Ingredients</h3>
        <ul v-if="recipe.ingredients" class="list-disc list-inside">
          <li
            class="text-primary-700"
            v-for="(ingredient, index) in recipe.ingredients"
            :key="index"
          >
            {{ ingredient }}
          </li>
        </ul>
      </div>
      <div
        class="sm:border-l-2 sm:border-b-0 border-b-2 border-solid border-primary-700 sm:pl-8 pb-8 sm:pb-0"
      >
        <h3 class="text-2xl mb-4">Preparation</h3>
        <ul class="flex flex-col gap-8 text-lg">
          <li
            class="text-primary-700"
            v-for="(step, index) in recipe.preparation"
            :key="index"
          >
            <h3 class="text-4xl font-black mr-4 inline-block">
              {{ index + 1 }}
            </h3>
            {{ step }}
          </li>
        </ul>
      </div>
    </section>
    <section class="border-t-2 border-solid border-primary-700 pt-8">
      <h3 class="text-2xl mb-4">Notes</h3>
      <ul class="flex flex-col gap-8 text-lg">
        <li
          class="text-primary-700"
          v-for="(note, index) in recipe.notes"
          :key="index"
        >
          {{ note }}
        </li>
      </ul>
    </section>
    <section class="flex justify-end">
      <Button
        label="Delete Recipe"
        @click="deleteRecipe"
        outlined
        size="small"
        class="w-fit"
      />
    </section>
  </div>
</template>
<!-- bg: #fdf4e4 | #375da3 -->
