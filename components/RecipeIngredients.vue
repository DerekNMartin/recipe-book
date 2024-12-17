<script setup lang="ts">
import useAuth from '@/composables/useAuth';

export interface IngredientsProps {
  ingredients?: string[] | null;
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
        <InputList listType="bullet" :items="editedIngredients" />
        <Button label="Save Changes" class="mt-4 w-full" @click="handleSave" />
      </div>
      <ul
        v-else
        class="list-disc list-inside flex flex-col gap-2 print:text-sm"
      >
        <li
          class="text-primary-700"
          v-for="(ingredient, index) in ingredients"
          :key="index"
        >
          {{ ingredient }}
        </li>
      </ul>
    </Transition>
  </section>
</template>
