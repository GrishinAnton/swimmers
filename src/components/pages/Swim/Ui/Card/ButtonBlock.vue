<template>
  <Button
    block
    :class="isViewCardDefault ? 'mb-2' : ''"
    variant="elevated"
    :color="buttonColor(props.swimmerData)"
    @click="() => changeTimerStatus(props.swimmerData)"
    >{{ buttonText(props.swimmerData) }}</Button
  >
  <Button
    block
    variant="elevated"
    color="green"
    @click="() => changeIntervalPassed(props.swimmerData)"
    v-if="settingsStore.interval"
    :disabled="circleButtonDisabled(props.swimmerData)"
    ><span class="buttonTime"
      ><span class="buttonTimeEl font-weight-bold">{{ relaxTime }}</span>
      <span>Круг</span>
    </span></Button
  >
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { getFullTImeValue } from "@/components/common/time/time";
import { useSettingsStore } from "@/features/settings/settingsStore";
import Button from "@/components/ui/Button/Button.vue";
import { useSwimStore } from "@/features/swim/swimStore";
import { ISwimData } from "./SwimCard.vue";

interface IProps {
  swimmerData: ISwimData;
}

const props = defineProps<IProps>();

const settingsStore = useSettingsStore();

const swimStore = useSwimStore();

const interval = ref();
const timeCount = ref(0);

const relaxTime = computed(() => getFullTImeValue(timeCount.value));
const isViewCardDefault = computed(() => swimStore.getCardView === "default");

const circleButtonDisabled = computed(
  () => (n: ISwimData) =>
    n.timerStatus === "stop" ||
    n.timerStatus === "reset" ||
    n.intervalsPassed === settingsStore.interval
);

const buttonText = computed(() => (swimmer: ISwimData) => {
  if (swimmer.timerStatus === "stop" || swimmer.timerStatus === "reset")
    return "Старт";
  if (swimmer.timerStatus === "start") return "Стоп";
});

const buttonColor = computed(() => (swimmer: ISwimData) => {
  if (swimmer.timerStatus === "stop" || swimmer.timerStatus === "reset")
    return "primary";
  if (swimmer.timerStatus === "start") return "error";
});

const changeIntervalPassed = (swimmer: ISwimData) => {
  swimmer.intervalsPassed += 1;
  if (settingsStore.isWithStop) {
    startRelaxTimer();
    swimmer.timerStatus = "stop";
  }
  if (swimmer.intervalsPassed === settingsStore.interval) {
    swimmer.timerStatus = "stop";
  }
};

const changeTimerStatus = (swimmer: ISwimData) => {
  swimStore.$patch({ action: null });
  clearRelaxTimer();
  if (swimmer.timerStatus === "stop" || swimmer.timerStatus === "reset") {
    swimmer.timerStatus = "start";
  } else if (swimmer.timerStatus === "start") {
    swimmer.timerStatus = "stop";
  }
};

const startRelaxTimer = () => {
  timeCount.value = 0;
  startInterval();
};

const clearRelaxTimer = () => {
  interval.value && clearInterval(interval.value);
};

// interval.value && clearInterval(interval.value);
const startInterval = () => {
  interval.value = setInterval(() => {
    timeCount.value += 10;

    // time.value = getFullTImeValue(count.value);
  }, 10);
};

watch(
  () => swimStore.action,
  () => {
    if (swimStore.action === "reset") {
      clearRelaxTimer();
      timeCount.value = 0;
    }
  }
);
</script>

<style scoped>
.smallView button {
  min-width: auto;
  height: 50px !important;
}

.smallView button:not(:last-child) {
  margin-right: 8px;
}

.buttonTime {
  display: flex;
  flex-direction: column;
  align-items: center;
  z-index: 1;
}

.buttonTimeEl {
  color: black;
  font-size: 18px;
}
</style>
