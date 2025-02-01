<script setup lang="ts">
import { ref, watch } from 'vue';

const newItem = ref('');
const words = ref([]);
const tooltipMessage = ref('');
const tooltipVisible = ref(false);

watch(words, (newItems) => {
  localStorage.setItem('words', JSON.stringify(newItems));
}, { deep: true });

const query = window.location.search;
if (query) {
  const params = new URLSearchParams(query);
  let wordsValue = params.get('l');
  if (wordsValue) {
    const value = atob(wordsValue);
    // @ts-ignore
    words.value = value.split(';');
  }
} else {
  const storedItems = localStorage.getItem('words');
  if (storedItems) {
    words.value = JSON.parse(storedItems);
  }
}

const addItem = () => {
  if (newItem.value.trim()) {
    // @ts-ignore
    words.value.unshift(newItem.value.trim().toLowerCase());
    newItem.value = '';
  }
};

const editItem = (index: number, newValue: string) => {
  if (newValue.trim()) {
    // @ts-ignore
    words.value[index] = newValue.trim();
  }
};

const removeItem = (index: number) => {
  words.value.splice(index, 1);
};

const shareLink = () => {
  return '/words?l=' + btoa(words.value.join(';'));
};

const copyLinkToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(window.location.origin + shareLink());
    tooltipMessage.value = 'Copier!';
  } catch (err) {
    tooltipMessage.value = 'Erreur!';
  }
  tooltipVisible.value = true;
  setTimeout(() => {
    tooltipVisible.value = false;
  }, 2000);
};
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <div class="flex mb-4">
      <input v-model="newItem" @keydown.enter="addItem" class="input input-bordered flex-grow mr-2" placeholder="Ajouter un mot" />
      <button @click="addItem" class="btn btn-primary">
        <i class="bi bi-plus-lg"></i>
      </button>
    </div>
    <ul class="list-none p-0">
      <li v-for="(item, index) in words" :key="index" class="flex items-center mb-2">
        <input v-model="words[index]" @blur="editItem(index, item)" class="input input-bordered flex-grow mr-2" />
        <button @click="removeItem(index)" class="btn btn-error">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>
    <div class="flex justify-center space-x-3 pt-6">
      <RouterLink :to="{ path: '/' }" class="btn btn-accent">Jouer <i class="bi bi-play"></i></RouterLink>
      <button @click="copyLinkToClipboard" class="btn btn-primary" :data-tip="tooltipMessage" :class="{ 'tooltip tooltip-bottom tooltip-open': tooltipVisible }">Partager <i class="bi bi-share"></i></button>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>