<script setup lang="ts">
import { ref, onMounted } from 'vue';

const words = ref([]);
const currentWord = ref('');
const inputValue = ref('');
const inputRef = ref<HTMLInputElement | null>(null);
const inputBorderColor = ref('');

const storedItems = localStorage.getItem('words');
if (storedItems) {
  words.value = JSON.parse(storedItems);
}

const i = Math.floor(Math.random() * words.value.length);
currentWord.value = words.value[i];

onMounted(() => {
  if (inputRef.value) {
    inputRef.value.focus();
  }
});

const handleKeydown = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    if (inputValue.value.trim().toLowerCase() === currentWord.value.trim().toLowerCase()) {
      inputBorderColor.value = 'focus:border-green-500';
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
  </div>
</template>

<style scoped>
/* Add your styles here */
</style>