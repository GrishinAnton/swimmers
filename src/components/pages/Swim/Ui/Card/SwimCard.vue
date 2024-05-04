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
        <ButtonBlock :swimmerData="n" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed, watch } from "vue";

import { TTimerStatus } from "@/components/common/time/time";
import { useSettingsStore } from "@/features/settings/settingsStore";
import { swimmers as swimmersData } from "@/components/common/dictionary/swimmers";
import InformationColumn from "./InformationColumn.vue";
import { useSwimStore } from "@/features/swim/swimStore";
import ButtonBlock from "./ButtonBlock.vue";

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
