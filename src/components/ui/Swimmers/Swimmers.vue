<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-combobox
      :items="swimmers"
      item-title="name"
      item-value="id"
      label="Плавцы"
      multiple
      chips
      @update:model-value="(val) => props.changeSwimmers(val)"
    />
  </v-item-group>
</template>

<script setup lang="ts">
import { swimmers } from "../../common/dictionary/swimmers";

const props = defineProps({
  changeSwimmers: {
    type: Function,
    required: true,
  },
});
</script>
