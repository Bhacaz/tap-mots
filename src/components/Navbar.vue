<script setup lang="ts">
function resetProgress() {
  const stored = localStorage.getItem('words');
  if (stored) {
    const words = JSON.parse(stored);
    // @ts-ignore
    const resetWords = words.map(w => ({ text: w.text, progress: 0 }));
    console.log('Resetting words:', resetWords);
    localStorage.setItem('words', JSON.stringify(resetWords));
  }
  window.location.reload();
}
</script>

<template>
  <div class="navbar bg-base-300">
    <div class="flex-1">
      <RouterLink to="/" class="btn btn-ghost text-xl">Tap Mots</RouterLink>
    </div>
    <div class="flex-none">
      <ul class="menu menu-horizontal px-1">
        <button @click="resetProgress" class="btn btn-ghost">Recommencer</button>
        <RouterLink to="/words" class="btn btn-ghost">Liste</RouterLink>
      </ul>
    </div>
  </div>
</template>

<style scoped>

</style>
