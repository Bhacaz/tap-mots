<script setup lang="ts">
import { ref } from 'vue';

const props = defineProps<{
  items: string[];
}>();

const newItem = ref('');
const items = ref([...props.items]);

const addItem = () => {
  if (newItem.value.trim()) {
    items.value.push(newItem.value.trim());
    newItem.value = '';
  }
};

const editItem = (index: number, newValue: string) => {
  if (newValue.trim()) {
    items.value[index] = newValue.trim();
  }
};

const removeItem = (index: number) => {
  items.value.splice(index, 1);
};
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="flex mb-4">
        <input v-model="newItem" class="input input-bordered flex-grow mr-2" placeholder="Nouveau mot" />
        <button @click="addItem" class="btn btn-primary">
          <i class="bi bi-plus-lg"></i>
        </button>
      </div>
    <ul class="list-none p-0">
      <li v-for="(item, index) in items" :key="index" class="flex items-center mb-2">
        <input v-model="items[index]" @blur="editItem(index, items[index])" class="input input-bordered flex-grow mr-2" />
        <button @click="removeItem(index)" class="btn btn-error">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>