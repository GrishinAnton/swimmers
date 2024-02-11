<script setup lang="ts">
// import Settings from "./components/Pages/Settings/Settings.vue";
import Swim from "./components/Pages/Swim/Swim.vue";
</script>

<template>
  <div class="root">
    <div class="mb-4">
      <h1>Пловцы</h1>
    </div>
    <!-- <Settings /> -->
    <Swim />
  </div>
</template>

<style scoped>
.root {
  border: 1px solid red;
  max-width: 320px;
  width: 100%;
}
</style>
