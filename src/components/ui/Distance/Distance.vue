<template>
  <v-select
    :items="distance"
    item-title="distance"
    item-value="id"
    label="Дистанция"
    variant="outlined"
    :model-value="activeValue"
    @update:model-value="(val) => changeDistance(val)"
    :rules="selectRules"
    required
    clearable
  >
    <!-- <template #clear>
      <button>
        <v-icon>mdi-close-circle</v-icon>
      </button>
    </template> --></v-select
  >
</template>

<script setup lang="ts">
import { distance } from "@/components/common/dictionary/distance";
import { selectRules } from "@/components/common/validation/validation";

interface Props {
  activeValue: number | null;
  changeDistance: (distance: number) => void;
}

defineProps<Props>();
</script>

<style scoped></style>
