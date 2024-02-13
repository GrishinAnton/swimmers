<template>
  <Distance :changeDistance="changeDistance" :activeValue="settings.distance" />
  <In :changeIn="changeIn" :activeValue="settings.in" />
  <Swimmers :changeSwimmers="changeSwimmers" :activeValue="settings.swimmers" />
  <div class="mb-6">
    <Button @click="resetSettingsHandler">Сбросить</Button>
    <Button :disabled="!canStart" @click="goToStart">Старт</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import Distance from "../../ui/Distance/Distance.vue";
import In from "../../ui/In/In.vue";
import Swimmers from "../../ui/Swimmers/Swimmers.vue";
import Button from "../../ui/Button/Button.vue";

import {
  defaultSettings,
  useSettingsStore,
  ISettings,
} from "../../../features/settings/storeSettings";
import { computed } from "vue";

const store = useSettingsStore();
const settings = ref<ISettings>(Object.assign({}, defaultSettings));
const router = useRouter();

const canStart = computed(() => {
  return Boolean(settings.value.swimmers?.length) && settings.value.distance;
});

const changeDistance = (distance: number) => {
  settings.value.distance = distance;
};

const changeIn = (inha: number) => {
  settings.value.in = inha;
};

const changeSwimmers = (swimmer: number[] | undefined) => {
  settings.value.swimmers = swimmer ?? null;
};

const resetSettingsHandler = () => {
  settings.value.distance = defaultSettings.distance;
  settings.value.in = defaultSettings.in;
  settings.value.swimmers = defaultSettings.swimmers;
};

const goToStart = () => {
  router.push("/start");
};

watch(settings.value, (val) => {
  store.$patch({
    distance: val.distance,
    in: val.in,
    swimmers: val.swimmers,
  });
});
</script>
