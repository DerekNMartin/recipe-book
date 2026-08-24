<script setup lang="ts">
import useAuth from '@/composables/useAuth';

export interface PreparationProps {
  steps?: string[] | null;
  editable?: boolean;
}
const props = withDefaults(defineProps<PreparationProps>(), {
  editable: true,
});
const emit = defineEmits(['save']);

const { isAuthenticated } = useAuth();

const editedSteps = ref(props.steps);

const isEditing = ref(false);
function toggleEditMode() {
  isEditing.value = !isEditing.value;
}

function handleSave() {
  emit('save', { preparation: editedSteps.value });
  toggleEditMode();
}
</script>

<template>
  <section>
    <div class="flex gap-2 items-center mb-6">
      <h3 class="text-2xl">Preparation</h3>
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
        <InputList listType="decimal" input-type="textarea" :items="editedSteps" />
        <Button label="Save Changes" class="mt-4 w-full" @click="handleSave" />
      </div>
      <ol
        v-else
        class="flex flex-col gap-6 text-lg print:text-base marker:content-[counter(list-item)'\a0\a0'] list-inside text-primary-700 marker:font-fancy marker:text-3xl"
      >
        <li v-for="(step, index) in steps" :key="index">
          {{ step }}
        </li>
      </ol>
    </Transition>
  </section>
</template>
