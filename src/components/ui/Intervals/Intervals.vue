<template>
  <v-select
    :items="intervals"
    item-title="interval"
    item-value="id"
    label="Интервалы"
    variant="outlined"
    clearable
    :model-value="activeValue"
    @update:model-value="(val) => changeIntervals(val)"
  />
</template>

<script setup lang="ts">
import { intervals } from "@/components/common/dictionary/intervals";

interface Props {
  activeValue: number | null;
  changeIntervals: (interval: number) => void;
}

defineProps<Props>();
</script>

<style scoped></style>
