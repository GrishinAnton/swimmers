<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-item v-for="n in distance" :key="n">
      <v-btn class="mr-2" border height="60" variant="text" width="120">{{
        n
      }}</v-btn>
    </v-item>
  </v-item-group>
</template>

<script setup lang="ts">
const distance = [50, 100, 200, 400, 800, 1000, 1500, 2000];
// defineProps<{ msg: string }>();
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
