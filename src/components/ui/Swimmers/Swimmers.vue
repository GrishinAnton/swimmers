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
    :rules="selectRules"
    required
  />
</template>

<script setup lang="ts">
import { swimmers } from "@/components/common/dictionary/swimmers";
import { selectRules } from "@/components/common/validation/validation";

interface Props {
  activeValue: number[] | null;
  changeSwimmers: (val: number[] | undefined) => void;
}

defineProps<Props>();
</script>
