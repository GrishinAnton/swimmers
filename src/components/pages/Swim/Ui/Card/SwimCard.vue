<template>
  <v-card
    class="pa-1 mb-2"
    variant="outlined"
    color="indigo"
    elevation="4"
    v-for="n in swimmerData"
    :key="n.swimId"
  >
    <v-row
      :class="isViewCardDefault ? 'flex-row' : 'flex-column'"
      justify="space-between"
      no-gutters
    >
      <v-col>
        <InformationColumn :swimmer-data="n" />
      </v-col>
      <v-col :class="isViewCardDefault ? '' : 'd-flex smallView'">
        <Button
          block
          class="mb-2"
          variant="elevated"
          :color="buttonColor(n)"
          @click="() => changeTimerStatus(n)"
          >{{ buttonText(n) }}</Button
        >
        <Button
          block
          variant="elevated"
          color="green"
          @click="() => changeIntervalPassed(n)"
          v-if="settingsStore.interval"
          :disabled="circleButtonDisabled(n)"
          >Круг</Button
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { TTimerStatus } from "@/components/common/time/time";
import { useSettingsStore } from "@/features/settings/settingsStore";
import { swimmers as swimmersData } from "@/components/common/dictionary/swimmers";
import Button from "@/components/ui/Button/Button.vue";
import InformationColumn from "./InformationColumn.vue";
import { useSwimStore } from "@/features/swim/swimStore";

export interface ISwimData {
  swimId: number;
  swimName: string;
  timerStatus: TTimerStatus;
  time: string;
  intervalsPassed: number;
}

const settingsStore = useSettingsStore();

const swimStore = useSwimStore();

const swimmerData = ref<ISwimData[]>();

const isViewCardDefault = computed(() => swimStore.getCardView === "default");

const circleButtonDisabled = computed(
  () => (n: ISwimData) =>
    n.timerStatus === "stop" ||
    n.timerStatus === "reset" ||
    n.intervalsPassed === settingsStore.interval
);

const fillSwimData = (swimmers: number[], timerStatus: TTimerStatus) => {
  return swimmers
    .map((swim) => {
      const swimmer = swimmersData.find((s) => s.id === swim);
      if (swimmer) {
        return {
          swimId: swimmer?.id,
          swimName: swimmer?.name,
          timerStatus: timerStatus,
          time: "",
          intervalsPassed: 0,
        };
      }
    })
    .filter((val) => Boolean(val)) as ISwimData[];
};

watch(
  () => swimStore.action,
  () => {
    if (settingsStore.swimmers && swimStore.action === "reset") {
      swimmerData.value = fillSwimData(settingsStore.swimmers, "reset");
    }
  }
);

watch(
  () => settingsStore.swimmers,
  () => {
    if (settingsStore.swimmers) {
      swimmerData.value = fillSwimData(settingsStore.swimmers, "stop");
    }
  },
  { immediate: true }
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
  swimmerData.value?.forEach((swim) => {
    if (swim.swimId === swimmer.swimId) {
      swim.intervalsPassed += 1;
      if (settingsStore.isWithStop) {
        swim.timerStatus = "stop";
      }
    }
    if (swim.intervalsPassed === settingsStore.interval) {
      swim.timerStatus = "stop";
    }
  });
};

const changeTimerStatus = (swimmer: ISwimData) => {
  swimStore.$patch({ action: null });
  swimmerData.value?.forEach((swim) => {
    if (
      swim.swimId === swimmer.swimId &&
      (swim.timerStatus === "stop" || swimmer.timerStatus === "reset")
    ) {
      swim.timerStatus = "start";
    } else if (swim.swimId === swimmer.swimId && swim.timerStatus === "start") {
      swim.timerStatus = "stop";
    }
  });
};
</script>

<style scoped>
.smallView {
  margin-right: 4px;
}

.smallView button {
  min-width: auto;
}
</style>
