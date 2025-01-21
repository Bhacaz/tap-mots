<script setup lang="ts">
import { ref, onMounted } from 'vue';

const words = ref([]);
const currentWord = ref('');
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const inputBorderColor = ref('');
const progress = ref<number[]>([]);

const storedItems = localStorage.getItem('words');
if (storedItems) {
  words.value = JSON.parse(storedItems);
  progress.value = new Array(words.value.length).fill(0);
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
  setRandomCurrentWord();
});

const setRandomCurrentWord = () => {
  const availableWords = words.value.filter((_, index) => progress.value[index] < 100);
  if (availableWords.length > 0) {
    const i = Math.floor(Math.random() * availableWords.length);
    currentWord.value = availableWords[i];
  } else {
    currentWord.value = '';
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (inputValue.value.trim().toLowerCase() === currentWord.value.trim().toLowerCase()) {
      inputBorderColor.value = 'focus:border-green-500';
      const index = words.value.indexOf(currentWord.value);
      if (index !== -1) {
        progress.value[index] = Math.min(progress.value[index] + 10, 100);
        setRandomCurrentWord();
      }
    } else {
      inputBorderColor.value = 'focus:border-red-500';
    }
    setTimeout(() => {
      inputBorderColor.value = '';
    }, 2000);
    inputValue.value = '';
  }
};
</script>

<template>
  <div class="max-w-lg mx-auto p-4">
    <input
        v-model="inputValue"
        @keydown="handleKeydown"
        :class="`input input-bordered w-full mb-4 ${inputBorderColor}`"
        ref="inputRef"
    />
    <h1>{{ currentWord }}</h1>
    <div class="flex justify-evenly mt-4">
      <div v-for="(word, index) in words" :key="index" class="w-16 h-48 border rounded-md border-gray-400 relative">
        <div :style="{ height: progress[index] + '%' }" class="w-full rounded-md absolute bottom-0 bg-blue-400"></div>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>