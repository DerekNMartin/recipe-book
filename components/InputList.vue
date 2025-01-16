<script setup lang="ts">
import draggable from 'vuedraggable';

const newItem = defineModel<string>();
const items = defineModel<string[] | null>('items');

const props = withDefaults(
  defineProps<{
    placeholder?: string;
    inputType?: 'text' | 'textarea';
    buttonLabel?: string;
  }>(),
  {
    inputType: 'text',
    buttonLabel: undefined,
  }
);

const itemizedList = computed({
  get() {
    return (
      items?.value?.map((text) => ({
        id: (Math.random() * 10000).toString(),
        text,
      })) || []
    );
  },
  set(newValue) {
    items.value = newValue.map(({ text }) => text);
  },
});

function handleAdd() {
  if (!newItem.value) return;
  if (isEditing.value) {
    if (items.value?.length && editItemIndex.value !== null) {
      items.value[editItemIndex.value] = newItem.value;
      editItemIndex.value = null;
    }
  } else {
    items.value?.push(newItem.value);
  }
  newItem.value = '';
}

const editItemIndex = ref<number | null>(null);
const isEditing = computed(
  () => editItemIndex.value !== null && editItemIndex.value >= 0
);
function handleEdit(itemIndex: number) {
  const item = items.value && items.value[itemIndex];
  if (item) {
    newItem.value = item;
    editItemIndex.value = itemIndex;
  }
}

function handleRemove(index: number) {
  items.value?.splice(index, 1);
  if (editItemIndex.value === index) {
    editItemIndex.value = null;
    newItem.value = '';
  }
}

function formatListItem(text: string) {
  const listCountRegex = new RegExp(/^\d+[,.)]/);
  if (listCountRegex.test(text)) {
    return text.split(listCountRegex)[1].trim();
  }
  return text.trim();
}
async function handlePaste(event: ClipboardEvent) {
  const clipboardData = event.clipboardData?.getData('text');
  const pastedList = clipboardData
    ?.split(/\r?\n|\r|\n/g)
    .filter((item) => Boolean(item) && !item.match(/step \d/i)?.length);

  if (pastedList?.length) {
    pastedList.forEach((item) => items.value?.push(formatListItem(item)));
    setTimeout(() => {
      newItem.value = '';
    }, 0);
  }
}
</script>

<template>
  <div class="flex flex-col gap-4">
    <div class="flex gap-2">
      <Textarea
        v-if="inputType === 'textarea'"
        style="field-sizing: content"
        class="flex-1"
        :placeholder="placeholder"
        v-model="newItem"
        @paste="handlePaste"
        @keyup.enter="handleAdd()"
      />
      <InputText
        v-else
        v-model="newItem"
        class="w-full"
        :placeholder="placeholder"
        @keyup.enter="handleAdd()"
        @paste="handlePaste"
      />
      <Button
        class="aspect-square h-full w-auto max-h-11 min-w-10"
        size="small"
        outlined
        :title="isEditing ? 'Update' : buttonLabel || 'Add'"
        :icon="isEditing ? 'pi pi-check' : 'pi pi-plus'"
        @click="handleAdd()"
      />
    </div>
    <draggable
      v-if="itemizedList?.length"
      v-model="itemizedList"
      item-key="id"
      class="flex flex-col gap-2"
      :animation="250"
      easing="cubic-bezier(0.85, 0, 0.15, 1)"
      handle=".handle"
    >
      <template #item="{ element, index }">
        <li
          :key="element.id"
          class="group text-primary-700 flex gap-2 items-center p-2 rounded-md bg-white w-full transition-colors justify-between border border-solid border-primary-200"
        >
          <!-- LEFT -->
          <div
            class="handle flex cursor-grab text-primary-300 hover:text-primary-600 transition-colors active:cursor-grabbing mr-2"
          >
            <i class="pi pi-ellipsis-v w-2"></i>
            <i class="pi pi-ellipsis-v w-2"></i>
          </div>
          <!-- CENTER -->
          <div class="flex flex-1 w-full items-center">
            <p
              class="cursor-pointer sm:text-base text-sm"
              @click="handleEdit(index)"
            >
              {{ element.text }}
            </p>
          </div>
          <!-- RIGHT -->
          <div>
            <i
              class="pi pi-trash cursor-pointer sm:opacity-0 group-hover:opacity-100 transition-opacity hover:text-primary-600 text-primary-300"
              title="Remove"
              @click="handleRemove(index)"
            ></i>
          </div>
        </li>
      </template>
    </draggable>
  </div>
</template>

<style lang="css">
.sortable-ghost {
  @apply bg-primary-50;
}
</style>
