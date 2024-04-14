<template>
  <div>{{ time }}</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { setInterval, clearInterval } from "worker-timers";
import { ISwimData } from "@/components/layout/SwimCard/SwimCard.vue";
import {
  getFullTImeValue,
  defaultTimeValue,
} from "@/components/common/time/time";

const count = ref(0);
const time = ref(defaultTimeValue);
const interval = ref();

export type TTimerStatus = "start" | "stop" | "reset";

interface Props {
  swimmer: ISwimData;
}

const props = defineProps<Props>();

watchEffect(() => {
  console.log(props.swimmer.timerStatus, "props.swimmer.timerStatus");
  if (props.swimmer.timerStatus === "start") {
    startInterval();
  }

  if (props.swimmer.timerStatus === "stop") {
    interval.value && clearInterval(interval.value);
  }

  if (props.swimmer.timerStatus === "reset") {
    interval.value && clearInterval(interval.value);
    count.value = 0;
    time.value = "";
  }
});

const startInterval = () => {
  interval.value = setInterval(() => {
    count.value += 100;

    time.value = getFullTImeValue(count.value);
  }, 100);
};
</script>

<style scoped></style>
