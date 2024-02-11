<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-item v-for="n in inha" :key="n.id">
      <v-btn
        class="mr-2"
        border
        height="60"
        variant="text"
        width="120"
        @click="() => props.changeIn(n)"
        >{{ n.name }}</v-btn
      >
    </v-item>
  </v-item-group>
</template>

<script setup lang="ts">
import { inha } from "../../common/dictionary/inha";

const props = defineProps({
  changeIn: {
    type: Function,
    required: true,
  },
});
</script>
