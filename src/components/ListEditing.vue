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
  <div>
    <input v-model="newItem" placeholder="Add new item" />
    <button @click="addItem">Add</button>
    <ul>
      <li v-for="(item, index) in items" :key="index">
        <input v-model="items[index]" @blur="editItem(index, items[index])" />
        <button @click="removeItem(index)">Remove</button>
      </li>
    </ul>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>