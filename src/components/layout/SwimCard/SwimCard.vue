<template>
  <v-card
    class="pa-1 mb-2"
    variant="outlined"
    color="indigo"
    elevation="4"
    v-for="n in swimmerData"
    :key="n.swimId"
  >
    <v-row justify="space-between" no-gutters>
      <v-col>
        <v-row no-gutters>
          <v-col>
            <v-sheet class="pa-2"> {{ n.swimName }}</v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2"><Timer :swimmer="n" /></v-sheet>
          </v-col>
        </v-row>
        <v-row no-gutters v-if="interval">
          <v-col>
            <v-sheet class="pa-2"> .v-col-auto </v-sheet>
          </v-col>
          <v-col>
            <v-sheet class="pa-2"> .v-col-auto </v-sheet>
          </v-col>
        </v-row>
      </v-col>
      <v-col>
        <Button
          block
          variant="elevated"
          :color="buttonColor(n)"
          @click="() => changeTimerStatus(n)"
          >{{ buttonText(n) }}</Button
        >
      </v-col>
    </v-row>
  </v-card>
</template>

<script setup lang="ts">
import { ref, watchEffect, computed } from "vue";

import Timer, { TTimerStatus } from "@/components/layout/Timer/Timer.vue";
import { useSettingsStore } from "@/features/settings/storeSettings";
import { swimmers as swimmersData } from "@/components/common/dictionary/swimmers";
import Button from "@/components/ui/Button/Button.vue";

export interface ISwimData {
  swimId: number;
  swimName: string;
  timerStatus: TTimerStatus;
  time: string;
}

const {
  getState: { swimmers, interval },
} = useSettingsStore();

const swimmerData = ref<ISwimData[]>();

watchEffect(() => {
  if (swimmers) {
    swimmerData.value = swimmers
      .map((swim) => {
        const swimmer = swimmersData.find((s) => s.id === swim);
        if (swimmer) {
          return {
            swimId: swimmer?.id,
            swimName: swimmer?.name,
            timerStatus: "stop",
            time: "",
          };
        }
      })
      .filter((val) => Boolean(val)) as ISwimData[];
  }
});

const buttonText = computed(() => (swimmer: ISwimData) => {
  if (swimmer.timerStatus === "stop") return "Старт";
  if (swimmer.timerStatus === "start") return "Стоп";
});

const buttonColor = computed(() => (swimmer: ISwimData) => {
  if (swimmer.timerStatus === "stop") return "primary";
  if (swimmer.timerStatus === "start") return "error";
});

const changeTimerStatus = (swimmer: ISwimData) => {
  swimmerData.value?.forEach((swim) => {
    if (swim.swimId === swimmer.swimId && swim.timerStatus === "stop") {
      swim.timerStatus = "start";
    } else if (swim.swimId === swimmer.swimId && swim.timerStatus === "start") {
      swim.timerStatus = "stop";
    }
  });
};

</script>

<style scoped></style>
