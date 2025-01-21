<script setup lang="ts">
import { ref, watch } from 'vue';

const newItem = ref('');
const items = ref([]);

watch(items, (newItems) => {
  localStorage.setItem('items', JSON.stringify(newItems));
}, { deep: true });

// Check if theres is a query params works with value. It is formated as Base64 joined by semi-colon
const query = window.location.search;
if (query) {
  const params = new URLSearchParams(query);
  let wordsValue = params.get('words');
  if (wordsValue) {
    const value = atob(wordsValue);
    items.value = value.split(';');
  }
} else {
  const storedItems = localStorage.getItem('items');
  if (storedItems) {
    items.value = JSON.parse(storedItems);
  }
}

const addItem = () => {
  if (newItem.value.trim()) {
    items.value.unshift(newItem.value.trim().toLowerCase());
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

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    addItem();
  }
};

const shareLink = () => {
  return '/list?words=' + btoa(items.value.join(';'));
};

</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="flex mb-4">
      <input v-model="newItem" @keydown="handleKeydown" class="input input-bordered flex-grow mr-2" placeholder="Ajouter un mot" />
      <button @click="addItem" class="btn btn-primary">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
    <ul class="list-none p-0">
      <li v-for="(item, index) in items" :key="index" class="flex items-center mb-2">
        <input v-model="items[index]" @blur="editItem(index, item)" class="input input-bordered flex-grow mr-2" />
        <button @click="removeItem(index)" class="btn btn-error">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>
    <div class="flex justify-center space-x-3 pt-6">
      <RouterLink :to="
		{
			path: '/'
		}" class="btn btn-accent">Jouer <i class="bi bi-play"></i></RouterLink>
      <a class="btn btn-primary" :href="shareLink()">Partager <i class="bi bi-share"></i></a>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>