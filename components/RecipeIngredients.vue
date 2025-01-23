<script setup lang="ts">
import type { Ingredient } from '@/types/recipe.types.js';

import { useClipboard } from '@vueuse/core';
import useAuth from '@/composables/useAuth';
const toast = useToast();

export interface IngredientsProps {
  ingredients: Ingredient[];
  editable?: boolean;
}
const props = withDefaults(defineProps<IngredientsProps>(), {
  editable: true,
});
const emit = defineEmits(['save']);

const { isAuthenticated } = useAuth();

const editedIngredients = ref(props.ingredients);

const isEditing = ref(false);
function toggleEditMode() {
  isEditing.value = !isEditing.value;
}

function handleSave() {
  emit('save', { ingredients: editedIngredients.value });
  toggleEditMode();
}

function copySingleIngredient({ name, original }: Ingredient) {
  const copiedIngredient = name || original;
  if (!copiedIngredient) return;
  const { copy } = useClipboard({ source: copiedIngredient });
  toast.add({
    summary: `Copied ${copiedIngredient}`,
    life: 2500,
  });
  copy();
}

const { copy: copyAllIngredients, copied } = useClipboard({
  source: props.ingredients.map(({ original }) => original)?.join('\n'),
});
</script>

<template>
  <section>
    <div class="flex gap-2 items-center mb-4">
      <h3 class="text-2xl">Ingredients</h3>
      <Button
        v-if="props.editable && isAuthenticated"
        icon="pi pi-pen-to-square"
        text
        rounded
        aria-label="Edit"
        @click="toggleEditMode"
      />
    </div>
    <Transition mode="out-in" name="fade">
      <div v-if="isEditing">
        <InputList listType="bullet" v-model:items="editedIngredients" />
        <Button label="Save Changes" class="mt-4 w-full" @click="handleSave" />
      </div>
      <ul
        v-else
        class="list-disc list-inside flex flex-col gap-2 print:text-sm"
      >
        <li
          :key="ingredient.id"
          class="text-primary-700 cursor-copy w-fit"
          v-for="ingredient in ingredients"
          @click="copySingleIngredient(ingredient)"
        >
          {{ ingredient.original }}
        </li>
      </ul>
    </Transition>
    <Button
      :label="copied ? 'Copied!' : 'Copy Ingredients'"
      outlined
      size="small"
      class="w-full mt-6"
      icon="pi pi-copy"
      @click="copyAllIngredients()"
    />
  </section>
</template>
