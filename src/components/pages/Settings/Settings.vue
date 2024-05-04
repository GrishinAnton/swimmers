<template>
  <HeaderTitle title="Настройки" />
  <v-form @submit.prevent="submit" ref="refForm">
    <!-- <Distance
      :changeDistance="changeDistance"
      :activeValue="settings.distance"
    /> -->
    <Intervals
      :changeIntervals="changeInterval"
      :activeValue="settings.interval"
    />
    <WithStop
      v-if="settings.interval"
      :activeValue="settings.isWithStop"
      :changeWithStop="changeIsWithStop"
    />
    <!-- <In :changeIn="changeIn" :activeValue="settings.in" /> -->
    <Swimmers
      :changeSwimmers="changeSwimmers"
      :activeValue="settings.swimmers"
    />
    <div class="mb-6">
      <Button class="mr-2" @click="resetSettingsHandler">Сбросить</Button>
      <Button type="submit">Старт</Button>
    </div>
  </v-form>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import HeaderTitle from "@/components/layout/HeaderTitle/HeaderTitle.vue";
// import Distance from "@/components/ui/Distance/Distance.vue";
import Intervals from "@/components/ui/Intervals/Intervals.vue";
// import In from "@/components/ui/In/In.vue";
import Swimmers from "@/components/ui/Swimmers/Swimmers.vue";
import Button from "@/components/ui/Button/Button.vue";
import { SubmitEventPromise } from "vuetify";

import {
  defaultSettingsState,
  useSettingsStore,
  ISettings,
} from "@/features/settings/settingsStore";
import WithStop from "@/components/ui/WithStop/WithStop.vue";

const store = useSettingsStore();
const settings = ref<ISettings>(Object.assign({}, defaultSettingsState));
const refForm = ref();
const router = useRouter();

// const changeDistance = (distance: number) => {
//   settings.value.distance = distance;
// };

const changeInterval = (interval: number) => {
  settings.value.interval = interval;
};

const changeIsWithStop = (wishStop: boolean | null) => {
  settings.value.isWithStop = wishStop ?? false;
};

// const changeIn = (inha: number) => {
//   settings.value.in = inha;
// };

const changeSwimmers = (swimmer: number[] | undefined) => {
  settings.value.swimmers = swimmer ?? null;
};

const resetSettingsHandler = () => {
  settings.value.distance = defaultSettingsState.distance;
  settings.value.in = defaultSettingsState.in;
  settings.value.swimmers = defaultSettingsState.swimmers;
  settings.value.interval = defaultSettingsState.interval;
  settings.value.isWithStop = defaultSettingsState.isWithStop;
  refForm.value.resetValidation();
};

const goToStart = async () => {
  router.push("/start");
};

const submit = async (submitEventPromise: SubmitEventPromise) => {
  const { valid } = await submitEventPromise;

  if (valid) {
    goToStart();
  }
};

watch(settings.value, (val) => {
  store.$patch({
    distance: val.distance,
    in: val.in,
    swimmers: val.swimmers,
    interval: val.interval,
    isWithStop: val.isWithStop,
  });
});
</script>
