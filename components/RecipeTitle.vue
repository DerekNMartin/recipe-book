<script setup lang="ts">
export interface RecipeTitleProps {
  title?: string | null;
  editable?: boolean;
}

const props = withDefaults(defineProps<RecipeTitleProps>(), {
  editable: true,
});
const emit = defineEmits(['save']);

const { isAuthenticated } = useAuth();

const isEditing = ref(false);
function toggleEditMode() {
  isEditing.value = !isEditing.value;
}

const titleInput = ref(props.title);
function handleSave() {
  emit('save', { title: titleInput.value });
  toggleEditMode();
}
</script>

<template>
  <Transition name="fade" mode="out-in">
    <div v-if="isEditing" class="flex flex-col sm:flex-row gap-4 w-full">
      <InputText v-model="titleInput" class="w-full" @keyup.enter="handleSave()" />
      <div class="flex gap-1 self-end">
        <Button
          class="aspect-square"
          size="small"
          title="Save"
          icon="pi pi-check"
          @click="handleSave()"
        />
        <Button
          size="small"
          class="aspect-square"
          outlined
          title="Cancel"
          icon="pi pi-times"
          @click="toggleEditMode()"
        />
      </div>
    </div>
    <div v-else class="flex gap-2 items-end">
      <h2 class="sm:text-5xl text-3xl font-bold sm:leading-[3.5rem] text-center">
        {{ props.title }}
      </h2>
      <Button
        v-if="props.editable && isAuthenticated"
        size="small"
        icon="pi pi-pen-to-square"
        text
        aria-label="Edit"
        @click="toggleEditMode()"
      />
    </div>
  </Transition>
</template>
