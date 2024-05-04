<template>
  <v-sheet class="d-flex">
    <v-sheet class="pa-1 font-weight-bold">
      {{ props.swimName }}
    </v-sheet>
    <v-sheet class="pa-1 font-weight-bold">{{ props.time }}</v-sheet>
    <v-sheet v-if="interval" class="pa-1">{{ props.actualCircleTime }}</v-sheet>
    <v-menu transition="scale-transition" v-if="interval">
      <template v-slot:activator="{ props }">
        <v-sheet v-bind="props" class="pa-1 tre">
          {{ lastLapTime }}
        </v-sheet>
      </template>

      <v-sheet class="pa-1 container">
        <v-sheet class="pa-1" v-for="(lap, index) in swimmableIntervals">
          <v-sheet class="d-flex">
            <v-sheet class="font-weight-bold pr-1"> {{ index + 1 }}:</v-sheet>
            <v-sheet> {{ getFullTImeValue(lap) }} </v-sheet>
          </v-sheet>
        </v-sheet>
      </v-sheet>
    </v-menu>

    <v-sheet v-if="interval" class="pa-1 font-weight-bold">
      {{ props.intervalsPassed }}/{{ props.interval }}</v-sheet
    >
  </v-sheet>
</template>

<script setup lang="ts">
import {
  defaultTimeValue,
  getFullTImeValue,
} from "@/components/common/time/time";
import { computed } from "vue";

interface IProps {
  swimName: string;
  interval: number | null;
  intervalsPassed: number;
  swimmableIntervals: number[];
  actualCircleTime: string;
  time: string;
}

const props = defineProps<IProps>();

const lastLapTime = computed(() => {
  if (props.swimmableIntervals.length) {
    const lastLap = [...props.swimmableIntervals].reverse()[0];
    return getFullTImeValue(lastLap);
  } else {
    return defaultTimeValue;
  }
});
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  max-height: 260px;
}
</style>
