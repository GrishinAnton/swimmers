<template>
  <v-container class="pa-2">
    <v-card
      class="pa-1 mb-2"
      variant="outlined"
      v-for="n in swimmerData"
      v-if="swimmerData"
      :key="n.swimId"
    >
      <v-row align="center" justify="space-between" no-gutters>
        <v-col
          ><div>{{ n.swimName }}</div>
          <Timer :swimmer="n" />
        </v-col>
        <v-col
          ><v-btn
            class="mr-2"
            border
            height="60"
            variant="text"
            width="120"
            @click="() => changeTimerStatus(n)"
            >{{ buttonText(n) }}</v-btn
          ></v-col
        >
      </v-row>
    </v-card>
    <div v-else>Сначала надо выбрать пловцов и дистанцию</div>
  </v-container>
  <div class="mb-6">
    <v-btn
      class="mr-2"
      border
      height="60"
      variant="text"
      width="120"
      @click="goToSettings"
      >{{ swimmers ? "Сбросить" : "Выбрать" }}</v-btn
    >
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import Timer, { TTimerStatus } from "../../layout/Timer/Timer.vue";
import { useSettingsStore } from "../../../features/settings/storeSettings";
import { swimmers as swimmersData } from "../../common/dictionary/swimmers";
import { ref, watchEffect, computed } from "vue";

export interface ISwimData {
  swimId: number;
  swimName: string;
  timerStatus: TTimerStatus;
  time: string;
}

const {
  getState: { swimmers },
} = useSettingsStore();
const router = useRouter();

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

const goToSettings = () => {
  router.push("/");
};

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
