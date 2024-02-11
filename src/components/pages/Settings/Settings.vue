<template>
  <Distance :changeDistance="changeDistance" />
  <In :changeIn="changeIn" />
  <Swimmers :changeSwimmers="changeSwimmers" :activeValue="settings.swimmers" />
  <div class="mb-6">
    <Button @click="resetSettingsHandler">Сбросить</Button>
    <Button @click="goToStart">Старт</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

import Distance from "../../ui/Distance/Distance.vue";
import In from "../../ui/In/In.vue";
import Swimmers from "../../ui/Swimmers/Swimmers.vue";
import Button from "../../ui/Button/Button.vue";
import { IDistance } from "../../common/dictionary/distance";
import { IInha } from "../../common/dictionary/inha";
import { ISwimmer } from "../../common/dictionary/swimmers";

interface ISettings {
  distance: IDistance | null;
  in: IInha | null;
  swimmers: ISwimmer[] | null;
}

const defaultSettings: ISettings = {
  distance: null,
  in: null,
  swimmers: null,
};

const settings = ref<ISettings>({ ...defaultSettings });
const router = useRouter();

const changeDistance = (distance: IDistance) => {
  settings.value.distance = distance;
};

const changeIn = (inha: IInha) => {
  settings.value.in = inha;
};

const changeSwimmers = (swimmer: ISwimmer[] | undefined) => {
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
  console.log(val.distance, "1watch");
  console.log(val.in, "2watch");
  console.log(val.swimmers, "3watch");
});
</script>
