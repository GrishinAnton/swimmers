<template>
  <div class="root">
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
