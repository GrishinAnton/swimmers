<template>
  <v-sheet class="d-flex mb-2">
    <button class="button" @click="toogleBlockHandle">
      <p class="dot text-lowercase blue-accent-3">пульс</p>
    </button>
  </v-sheet>
  <v-sheet class="d-flex mb-2" v-if="blockToggle"
    ><PulseTimer />
    <PulseTimer />
    <PulseTimer />
  </v-sheet>
</template>

<script setup lang="ts">
import { ref } from "vue";
import PulseTimer from "./PulseTimer/PulseTimer.vue";

const blockToggle = ref<boolean>(false);

const toogleBlockHandle = () => {
  blockToggle.value = !blockToggle.value;
};
</script>

<style scoped>
.button {
  margin-left: auto;
}
.dot {
  border-bottom: 1px dotted #000;
  margin-left: auto;
  line-height: 15px;
}
</style>
