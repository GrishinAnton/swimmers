<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-item v-for="n in inha" :key="n">
      <v-btn class="mr-2" border height="60" variant="text" width="120">{{
        n
      }}</v-btn>
    </v-item>
  </v-item-group>
</template>

<script setup lang="ts">
const inha = ["В ластах", "В лопатках", "Лас + Лап", "Калабашка", "Лап + Кал"];
// defineProps<{ msg: string }>();
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
