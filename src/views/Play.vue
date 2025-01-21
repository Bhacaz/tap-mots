<script setup lang="ts">
import {ref} from "vue";

const words = ref([]);
const currentWord = ref('');
const storedItems = localStorage.getItem('words');
if (storedItems) {
  words.value = JSON.parse(storedItems);
}

const i = Math.floor(Math.random() * words.value.length);
currentWord.value = words.value[i]
</script>

<template>
  <h1>{{words.join(';')}}</h1>
  <h1>{{currentWord}}</h1>
</template>

<style scoped>

</style>