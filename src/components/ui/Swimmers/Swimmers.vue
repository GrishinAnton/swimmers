<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-combobox :items="swimmers" label="Плавцы" multiple chips></v-combobox>
  </v-item-group>
</template>

<script setup lang="ts">
const swimmers = ["Антон", "Денис", "Александр", "Сергей", "Маша"];
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
</style>
