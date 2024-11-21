<script setup lang="ts">
export interface NoteProps {
  notes?: string[] | null;
}
const props = defineProps<NoteProps>();
const emit = defineEmits(['save']);

const editedNotes = ref(props.notes);

const isEditing = ref(false);
function toggleEditMode() {
  isEditing.value = !isEditing.value;
}

function handleSave() {
  emit('save', { notes: editedNotes.value });
  toggleEditMode();
}
</script>

<template>
  <section class="border-t-2 border-solid border-primary-700 pt-8">
    <div class="flex gap-2 items-center mb-4">
      <h3 class="text-2xl">Notes</h3>
      <Button
        icon="pi pi-pen-to-square"
        text
        rounded
        aria-label="Edit"
        @click="toggleEditMode"
      />
    </div>
    <Transition name="fade" mode="out-in">
      <div v-if="isEditing">
        <InputList
          listType="bullet"
          input-type="textarea"
          :items="editedNotes"
        />
        <Button label="Save Changes" class="mt-4 w-full" @click="handleSave" />
      </div>
      <ul v-else class="flex flex-col gap-8 text-lg">
        <li
          class="text-primary-700"
          v-for="(note, index) in notes"
          :key="index"
        >
          {{ note }}
        </li>
      </ul>
    </Transition>
  </section>
</template>
