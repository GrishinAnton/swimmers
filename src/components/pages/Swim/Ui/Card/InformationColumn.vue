<template>
  <v-row class="mr-2" no-gutters>
    <v-col>
      <v-sheet class="pa-2 font-weight-bold">
        {{ props.swimmerData.swimName }}
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 font-weight-bold">{{ time }}</v-sheet>
    </v-col>
  </v-row>
  <v-row class="mr-2" no-gutters v-if="props.swimmerData.intervalsPassed">
    <v-col>
      <v-sheet class="pa-2 text-caption">last</v-sheet>
      <v-sheet class="pa-2"> {{ lastLapTime }} </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="d-flex flex-column">
        <v-sheet class="pa-2 text-caption">actual</v-sheet>
        <v-sheet class="pa-2">{{ actualCircleTime }}</v-sheet>
      </v-sheet>
    </v-col>
  </v-row>
  <v-row class="mr-2" no-gutters v-if="props.swimmerData.intervalsPassed">
    <v-col class="d-flex flex-row align-center">
      <v-sheet class="pa-2 text-caption">кругов: </v-sheet
      ><v-sheet class="pa-2 font-weight-bold"> {{ actualCircle }}</v-sheet>
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
import { ISwimData } from "./SwimCard.vue";
import { computed, ref, watch } from "vue";

import {
  getFullTImeValue,
  defaultTimeValue,
} from "@/components/common/time/time";

const count = ref(0);
const summSwimmableIntervals = ref(0);
const swimmableIntervals = ref<number[]>([]);
const time = ref(defaultTimeValue);
const interval = ref();

export type TTimerStatus = "start" | "stop" | "reset";

interface IProps {
  swimmerData: ISwimData;
}

const props = defineProps<IProps>();

const actualCircle = computed(() => swimmableIntervals.value.length);

const actualCircleTime = computed(() =>
  getFullTImeValue(count.value - summSwimmableIntervals.value)
);

const lastLapTime = computed(() =>
  getFullTImeValue([...swimmableIntervals.value].reverse()[0])
);

watch(
  () => props.swimmerData.timerStatus,
  () => {
    if (props.swimmerData.timerStatus === "start") {
      startInterval();
    }

    if (props.swimmerData.timerStatus === "stop") {
      interval.value && clearInterval(interval.value);
    }

    if (props.swimmerData.timerStatus === "reset") {
      interval.value && clearInterval(interval.value);
      count.value = 0;
      swimmableIntervals.value = [];
      summSwimmableIntervals.value = 0;
      time.value = defaultTimeValue;
    }
  }
);

watch(
  () => props.swimmerData.timerStatus,
  () => {
    if (props.swimmerData.timerStatus === "stop") {
      const lastLap = count.value - summSwimmableIntervals.value;
      summSwimmableIntervals.value += lastLap;
      swimmableIntervals.value.push(lastLap);
    }
  }
);

watch(
  () => props.swimmerData.intervalsPassed,
  () => {
    if (props.swimmerData.timerStatus !== "reset") {
      const lastLap = count.value - summSwimmableIntervals.value;
      summSwimmableIntervals.value += lastLap;
      swimmableIntervals.value.push(lastLap);
    }
  }
);

const startInterval = () => {
  interval.value = setInterval(() => {
    count.value += 10;

    time.value = getFullTImeValue(count.value);
  }, 10);
};
</script>

<style scoped></style>
