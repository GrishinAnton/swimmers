<template>
  <div class="root">
    <router-view></router-view>
  </div>
</template>

<script setup lang="ts">
//TODO Подумтаь еще надо это или нет
// window.addEventListener("beforeunload", (event) => {
//   event.preventDefault();
//   console.log("asdasdasd");
//   alert("asdasdasd");
// });
</script>

<style scoped>
.root {
  min-width: 320px;
  /* max-width: 400px; */
  width: 100%;

  padding: 16px;

  margin: auto;
}
</style>
