<script setup lang="ts">
import Navbar from "./components/Navbar.vue";
import ListEditing from "./components/ListEditing.vue";
</script>

<template>
  <Navbar />
  <ListEditing items=""/>
  <button class="btn">Button</button>
  <button class="btn btn-neutral">Neutral</button>
  <button class="btn btn-primary">Primary</button>
  <button class="btn btn-secondary">Secondary</button>
  <button class="btn btn-accent">Accent</button>
  <button class="btn btn-ghost">Ghost</button>
  <button class="btn btn-link">Link</button>
</template>

<style scoped>

</style>
