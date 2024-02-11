<template>
  <Distance :changeDistance="changeDistance" />
  <In :changeIn="changeIn" />
  <Swimmers :changeSwimmers="changeSwimmers" />
  <div class="mb-6">
    <Button>Сбросить</Button>
    <Button>Старт</Button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from "vue";
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

const settings = ref<ISettings>({
  distance: null,
  in: null,
  swimmers: null,
});

const changeDistance = (distance: IDistance) => {
  settings.value.distance = distance;
};

const changeIn = (inha: IInha) => {
  settings.value.in = inha;
};

const changeSwimmers = (swimmer: ISwimmer[]) => {
  settings.value.swimmers = swimmer;
};

watch(settings.value, (val) => {
  console.log(val.distance, "1watch");
  console.log(val.in, "2watch");
  console.log(val.swimmers, "3watch");
});
</script>
