<template>
  <v-select
    :items="swimmers"
    item-title="name"
    item-value="id"
    label="Пловцы"
    variant="outlined"
    clearable
    multiple
    chips
    :model-value="activeValue"
    @update:model-value="(val) => changeSwimmers(val)"
  />
</template>

<script setup lang="ts">
import { swimmers } from "../../common/dictionary/swimmers";

interface Props {
  activeValue: number[] | null;
  changeSwimmers: (val: number[] | undefined) => void;
}

defineProps<Props>();
</script>
