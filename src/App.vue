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
  border: 1px solid red;
  max-width: 320px;
  width: 100%;
}
</style>
