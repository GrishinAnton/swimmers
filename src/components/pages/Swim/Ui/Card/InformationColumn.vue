<template>
  <DefaultView
    v-if="isViewDefault"
    :actual-circle-time="actualCircleTime"
    :swim-name="props.swimmerData.swimName"
    :interval="settingsStore.interval"
    :intervalsPassed="props.swimmerData.intervalsPassed"
    :lastLapTime="lastLapTime"
    :time="time"
  />
  <SmallView
    v-if="!isViewDefault"
    :actual-circle-time="actualCircleTime"
    :swim-name="$props.swimmerData.swimName"
    :interval="settingsStore.interval"
    :intervalsPassed="$props.swimmerData.intervalsPassed"
    :swimmableIntervals="swimmableIntervalsValues"
    :time="time"
  />
</template>

<script setup lang="ts">
import DefaultView from "./Ui/DefaultView.vue";
import SmallView from "./Ui/SmallView.vue";
import { ISwimData } from "./SwimCard.vue";
import { computed, ref, watch } from "vue";

import {
  getFullTImeValue,
  defaultTimeValue,
} from "@/components/common/time/time";
import { useSettingsStore } from "@/features/settings/settingsStore";
import { useSwimStore } from "@/features/swim/swimStore";

const settingsStore = useSettingsStore();
const swimStore = useSwimStore();
const count = ref(0);
const summSwimmableIntervals = ref(0);
const swimmableIntervals = ref<number[]>([]);
const time = ref(defaultTimeValue);
const interval = ref();

interface IProps {
  swimmerData: ISwimData;
}

const props = defineProps<IProps>();

const isViewDefault = computed(() => swimStore.getCardView === "default");

const actualCircleTime = computed(() =>
  getFullTImeValue(count.value - summSwimmableIntervals.value)
);

const swimmableIntervalsValues = computed(() => [...swimmableIntervals.value]);

const lastLapTime = computed(() => {
  if (swimmableIntervals.value.length) {
    return [...swimmableIntervals.value]
      .reverse()
      .map((el) => getFullTImeValue(el))
      .join("; ");
  } else {
    return defaultTimeValue;
  }
});

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
