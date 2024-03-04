<template>
  <v-select
    :items="inha"
    item-title="name"
    item-value="id"
    label="Инвентарь"
    variant="outlined"
    clearable
    :model-value="activeValue"
    @update:model-value="(val) => changeIn(val)"
  />
</template>

<script setup lang="ts">
import { inha } from "@/components/common/dictionary/inha";

interface Props {
  activeValue: number | null;
  changeIn: (inha: number) => void;
}

defineProps<Props>();
</script>
