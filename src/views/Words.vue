<script setup lang="ts">
import { ref, watch } from 'vue';

const newItem = ref('');
const words = ref<{ text: string; progress: number }[]>([]);
const tooltipMessage = ref('');
const tooltipVisible = ref(false);
const timeGoodAnswer = ref(5);

// Load TIME_GOOD_ANSWER from localStorage
const storedTime = localStorage.getItem('TIME_GOOD_ANSWER');
if (storedTime) {
  timeGoodAnswer.value = parseInt(storedTime, 10);
}

const query = window.location.search;
if (query) {
  const params = new URLSearchParams(query);
  let wordsValue = params.get('l');
  if (wordsValue) {
    const value = atob(wordsValue);
    words.value = value.split(';').map((t: string) => ({ text: t, progress: 0 }));
  }
} else {
  const storedItems = localStorage.getItem('words');
  if (storedItems) {
    const parsed = JSON.parse(storedItems);
    words.value = parsed.map((t: any) => ({ text: t.text, progress: t.progress || 0 }));
  }
}

const addItem = () => {
  if (newItem.value.trim()) {
    words.value.unshift({ text: newItem.value.trim().toLowerCase(), progress: 0 });
    newItem.value = '';
  }
};

const editItem = (index: number, newValue: string) => {
  if (newValue.trim()) {
    words.value[index].text = newValue.trim();
  }
};

const removeItem = (index: number) => {
  words.value.splice(index, 1);
};

const shareLink = () => {
  return '/words?l=' + btoa(words.value.map(w => w.text).join(';'));
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

watch(timeGoodAnswer, (newVal) => {
  localStorage.setItem('TIME_GOOD_ANSWER', newVal.toString());
});

watch(words, (newItems) => {
  localStorage.setItem('words', JSON.stringify(newItems));
}, { deep: true });
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
        <input v-model="words[index].text" @blur="editItem(index, item.text)" class="input input-bordered flex-grow mr-2" />
        <button @click="removeItem(index)" class="btn btn-error">
          <i class="bi bi-trash"></i>
        </button>
      </li>
    </ul>
    <div class="mb-4 flex items-center">
      <label for="timeGoodAnswer" class="mr-2">Nombre de bonnes réponses pour valider un mot :</label>
      <input id="timeGoodAnswer" type="number" min="1" v-model="timeGoodAnswer" class="input input-bordered w-20" />
    </div>
    <div class="flex justify-center space-x-3 pt-6">
      <RouterLink :to="{ path: '/' }" class="btn btn-accent">Jouer <i class="bi bi-play"></i></RouterLink>
      <button @click="copyLinkToClipboard" class="btn btn-primary" :data-tip="tooltipMessage" :class="{ 'tooltip tooltip-bottom tooltip-open': tooltipVisible }">Partager <i class="bi bi-share"></i></button>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>