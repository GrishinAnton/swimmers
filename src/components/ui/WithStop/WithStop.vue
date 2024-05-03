<template>
  <v-checkbox
    label="С остановкой"
    :model-value="activeValue"
    @update:model-value="(val) => changeWithStop(val)"
  ></v-checkbox>
</template>

<script setup lang="ts">
interface Props {
  activeValue: boolean;
  changeWithStop: (val: boolean | null) => void;
}

defineProps<Props>();
</script>
