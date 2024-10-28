<script setup lang="ts">
const newItem = defineModel<string>();
const items = defineModel<string[]>('items');

const props = withDefaults(
  defineProps<{
    listType?: 'bullet' | 'decimal' | 'none';
    inputType?: 'text' | 'textarea';
    buttonLabel?: string;
  }>(),
  {
    listType: 'none',
    inputType: 'text',
    buttonLabel: undefined,
  }
);

const listTypeClass = computed(() => {
  const classMapping = {
    bullet: 'list-disc ml-4 pl-4',
    decimal: 'list-decimal ml-4 pl-4',
    none: 'list-none',
  };
  return classMapping[props.listType];
});

function handleAdd() {
  if (!newItem.value) return;
  items.value?.push(newItem.value);
  newItem.value = '';
}

function handleEdit(itemIndex: number) {
  const item = items.value && items.value[itemIndex];
  if (item) {
    newItem.value = item;
    handleRemove(itemIndex);
  }
}

function handleRemove(index: number) {
  items.value?.splice(index, 1);
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
    <div class="flex gap-4">
      <Textarea
        class="w-full"
        v-if="inputType === 'textarea'"
        v-model="newItem"
        @paste="handlePaste"
        @keyup.enter="handleAdd()"
      />
      <InputText
        v-else
        v-model="newItem"
        @keyup.enter="handleAdd()"
        class="w-full"
        @paste="handlePaste"
      />
      <Button
        :label="buttonLabel || 'Add'"
        size="small"
        class="h-fit min-w-fit"
        @click="handleAdd()"
        icon="pi pi-plus"
      />
    </div>
    <ul :class="listTypeClass">
      <li
        v-for="(text, index) in items"
        :key="index"
        class="group w-fit text-primary-700"
      >
        <div class="flex items-center gap-2 group">
          <p class="cursor-pointer" @click="handleEdit(index)">
            {{ text }}
          </p>
          <i
            class="pi pi-times cursor-pointer opacity-0 group-hover:opacity-100"
            @click="handleRemove(index)"
          ></i>
        </div>
      </li>
    </ul>
  </div>
</template>
