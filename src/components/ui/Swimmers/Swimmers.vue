<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-combobox
      :items="swimmers"
      item-title="name"
      item-value="id"
      label="Пловцы"
      multiple
      chips
      :model-value="activeValue"
      @update:model-value="(val) => changeSwimmers(val)"
    />
  </v-item-group>
</template>

<script setup lang="ts">
import { swimmers, ISwimmer } from "../../common/dictionary/swimmers";

interface Props {
  activeValue: ISwimmer[] | null;
  changeSwimmers: (val: ISwimmer[] | undefined) => void;
}

defineProps<Props>();
</script>
