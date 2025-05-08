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
    <div class="flex gap-2 items-center mb-4">
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
      <ul v-else class="flex flex-col gap-6 text-lg print:text-base">
        <li class="text-primary-700" v-for="(step, index) in steps" :key="index">
          <h3 class="text-4xl font-black mr-4 inline-block">
            {{ index + 1 }}
          </h3>
          {{ step }}
        </li>
      </ul>
    </Transition>
  </section>
</template>
