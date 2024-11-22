<script setup lang="ts">
import useAuth from '@/composables/useAuth';

export interface NoteProps {
  notes?: string[] | null;
}
const props = defineProps<NoteProps>();
const emit = defineEmits(['save']);

const { isAuthenticated } = useAuth();

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
  <section>
    <div class="flex gap-2 items-center mb-4">
      <h3 class="text-2xl">Notes</h3>
      <Button
        v-if="isAuthenticated"
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
      <ul v-else class="flex flex-col gap-8 text-lg print:text-base">
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
