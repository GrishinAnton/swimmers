<template>
  <div>{{ time }}</div>
</template>

<script setup lang="ts">
import { ref, watchEffect } from "vue";

import { setInterval, clearInterval } from "worker-timers";
import { ISwimData } from "@/components/pages/Swim/Swim.vue";

const count = ref(0);
const time = ref("00:00:000");
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
    let ms = count.value % 1000;
    let s = Math.floor(count.value / 1000) % 60;
    let m = Math.floor(count.value / 60000) % 60;

    time.value = m + ":" + s + ":" + ms;
  }, 100);
};
</script>

<style scoped></style>
