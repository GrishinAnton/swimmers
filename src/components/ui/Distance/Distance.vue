<template>
  <v-item-group
    class="d-flex justify-sm-space-between px-2 pt-2 pb-6 overflow-x-auto"
  >
    <v-item v-for="n in distance" :key="n.id">
      <v-btn
        class="mr-2"
        border
        height="60"
        variant="text"
        width="120"
        @click="() => props.changeDistance(n)"
        >{{ n.distance }}</v-btn
      >
    </v-item>
  </v-item-group>
</template>

<script setup lang="ts">
import { distance } from "../../common/dictionary/distance";

const props = defineProps({
  changeDistance: {
    type: Function,
    required: true,
  },
});
</script>

<style scoped></style>
