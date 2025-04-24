<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { Word } from '../models/Word';
import Confetti from "../components/Confetti.vue";

const words = ref<Word[]>([]);
const currentWord = ref<Word | null>(null);
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const inputBorderColor = ref('');
const showWrongWord = ref<string | null>(null);
const showWrongInput = ref<string | null>(null);
const waitingForNextWord = ref(false);

const storedItems = localStorage.getItem('words');
if (storedItems) {
  const parsedWords = JSON.parse(storedItems);
  words.value = parsedWords.map((w: { text: string; progress: number }) => {
    const word = new Word(w.text);
    word.progress = w.progress || 0;
    return word;
  });
}

function saveProgress() {
  // Save array of { text, progress }
  const toStore = words.value.map(word => ({ text: word.text, progress: word.progress }));
  localStorage.setItem('words', JSON.stringify(toStore));
}

onMounted(() => {
  focusInput()
  setRandomCurrentWord();
});

const focusInput = () => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
};

const speakCurrentWord = () => {
  if (currentWord.value) {
    const msg = new SpeechSynthesisUtterance();
    msg.text = currentWord.value.text;
    msg.lang = 'fr-CA';
    msg.rate = 0.7;
    window.speechSynthesis.speak(msg);
    focusInput();
  }
};

const setRandomCurrentWord = () => {
  const availableWords = words.value.filter(word => !word.completed());
  if (availableWords.length > 0) {
    const i = Math.floor(Math.random() * availableWords.length);
    currentWord.value = availableWords[i];
    speakCurrentWord()
  } else {
    currentWord.value = null;
  }
};

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter' && currentWord.value) {
    if (inputValue.value === '') { return; }
    
    if (waitingForNextWord.value) {
      // User pressed Enter to continue after error
      inputBorderColor.value = '';
      showWrongWord.value = null;
      showWrongInput.value = null;
      waitingForNextWord.value = false;
      inputValue.value = '';
      setRandomCurrentWord();
      return;
    }
    
    if (inputValue.value.trim().toLowerCase() === currentWord.value.text.trim().toLowerCase()) {
      inputBorderColor.value = 'focus:border-green-500';
      currentWord.value.increaseProgress();
      saveProgress(); // Save after progress update
      inputValue.value = '';
      setRandomCurrentWord();
      
      // Clear border after a short time for correct answers
      setTimeout(() => {
        inputBorderColor.value = '';
      }, 2000);
    } else {
      inputBorderColor.value = 'focus:border-red-500';
      showWrongWord.value = currentWord.value.text;
      showWrongInput.value = inputValue.value;
      waitingForNextWord.value = true;
    }
  }
};
</script>

<template>
<!--  <p>{{currentWord}}</p>-->
  <div class="p-4 flex flex-col items-center">
    <div class="w-lg">
      <div class="flex pt-8">
        <input
            v-model="inputValue"
            @keydown="handleKeydown"
            :class="`input input-bordered w-full mb-4 ${inputBorderColor}`"
            ref="inputRef"
        />
        <button @click="speakCurrentWord" class="btn btn-primary ml-2">
          <i class="bi bi-volume-up text-2xl"></i>
        </button>
      </div>
    </div>
    <div class="h-28">
        <div v-if="showWrongWord && showWrongInput" class="text-center p-3 px-8 bg-base-200 rounded-lg shadow-sm">
          <p class="text-red-500 font-bold">{{ showWrongInput }}</p>
          <p class="text-green-500 font-bold">{{ showWrongWord }}</p>
          <p class="text-sm text-base-content mt-2">Appuyer ↵ pour continuer</p>
        </div>
      </div>
    <div class="flex justify-evenly w-full">
      <div v-for="(word, index) in words" :key="index" >
        <div class="w-16 h-48 border rounded-md border-gray-300 relative">
          <div :style="{ height: word.completionPercentage() + '%' }"
     :class="word.completed() ? 'bg-emerald-300 border-white' : 'bg-blue-400'"
     class="w-full rounded-md absolute bottom-0 progress-bar"></div>
        </div>
        <p v-if="word.completed()" class="pt-2 text-center">{{ word.text }}</p>
      </div>
    </div>
  </div>
  <Confetti v-if="words.filter(word => word.completed()).length === words.length" />
</template>

<style scoped>
.progress-bar {
  transition: height 800ms ease-out;
}
</style>