<template>
  <div class="root">
    <div class="mb-4">
      <h1>Пловцы</h1>
    </div>
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped>
.root {
  min-width: 320px;
  /* max-width: 400px; */
  width: 100%;

  padding: 16px;

  margin: auto;
}
</style>
