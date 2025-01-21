<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Word } from '../models/Word';

const words = ref<Word[]>([]);
const currentWord = ref<Word | null>(null);
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const inputBorderColor = ref('');

const storedItems = localStorage.getItem('words');
if (storedItems) {
  const parsedWords = JSON.parse(storedItems);
  words.value = parsedWords.map((wordText: string) => new Word(wordText));
}

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
  setRandomCurrentWord();
});

const setRandomCurrentWord = () => {
  const availableWords = words.value.filter(word => !word.completed());
  if (availableWords.length > 0) {
    const i = Math.floor(Math.random() * availableWords.length);
    currentWord.value = availableWords[i];
  } else {
    currentWord.value = null;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && currentWord.value) {
    if (inputValue.value.trim().toLowerCase() === currentWord.value.text.trim().toLowerCase()) {
      inputBorderColor.value = 'focus:border-green-500';
      currentWord.value.increaseProgress();
      setRandomCurrentWord();
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
    <h1>{{ currentWord?.text }}</h1>
    <div class="flex justify-evenly mt-4">
      <div v-for="(word, index) in words" :key="index" >
        <div class="w-16 h-48 border rounded-md border-gray-400 relative">
          <div :style="{ height: word.completionPercentage() + '%' }" class="w-full rounded-md absolute bottom-0 bg-blue-400"></div>
        </div>
        <p>{{ word.text }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>