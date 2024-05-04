<template>
  <div class="mb-2">
    <v-sheet class="d-flex align-center">
      <slot></slot>
      <h1>{{ title }}</h1>
    </v-sheet>
  </div>
</template>

<script setup lang="ts">
interface Props {
  title: string;
}

const { title } = defineProps<Props>();
</script>

<style scoped></style>
