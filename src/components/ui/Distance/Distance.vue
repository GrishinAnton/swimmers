<template>
  <v-select
    :items="distance"
    item-title="distance"
    item-value="id"
    label="Дистанция"
    variant="outlined"
    clearable
    :model-value="activeValue"
    @update:model-value="(val) => changeDistance(val)"
  />
</template>

<script setup lang="ts">
import { distance } from "@/components/common/dictionary/distance";

interface Props {
  activeValue: number | null;
  changeDistance: (distance: number) => void;
}

defineProps<Props>();
</script>

<style scoped></style>
