<template>
  <v-sheet class="d-flex justify-space-between">
    <HeaderTitle title="Заплыв">
      <v-btn
        class="ma-2"
        color="orange-darken-2"
        density="compact"
        icon="mdi-arrow-left"
        @click="goBack"
      >
      </v-btn
    ></HeaderTitle>
    <v-sheet class="d-flex"
      ><v-btn
        class="ma-2"
        density="compact"
        :color="isCardViewDefault"
        icon="mdi-view-grid-plus-outline"
        @click="changeCardView"
      >
      </v-btn
    ></v-sheet>
  </v-sheet>
  <Pulse v-if="isHasSwimmers" />
  <SwimCard v-if="isHasSwimmers" />
  <div v-else>Сначала надо выбрать пловцов и дистанцию</div>
  <div class="mb-6 mt-6">
    <Button class="mr-2" v-if="!isHasSwimmers" @click="goToSettings"
      >Выбрать</Button
    >
    <Button class="mr-2" v-if="isHasSwimmers" @click="resetState"
      >Сбросить</Button
    >
    <!-- <Button v-if="isHasSwimmers" @click="saveState">Сохранить</Button> -->
  </div>
</template>

<script setup lang="ts">
import { useRouter } from "vue-router";
import { computed } from "vue";

import HeaderTitle from "@/components/layout/HeaderTitle/HeaderTitle.vue";

import { useSettingsStore } from "@/features/settings/settingsStore";
import Button from "@/components/ui/Button/Button.vue";
import SwimCard from "@/components/pages/Swim/Ui/Card/SwimCard.vue";
import { useSwimStore } from "@/features/swim/swimStore";
import Pulse from "./Ui/Pulse/Pulse.vue";

const {
  getState: { swimmers },
} = useSettingsStore();

const swimStore = useSwimStore();

const router = useRouter();

const isHasSwimmers = computed(() => swimmers?.length);

const isCardViewDefault = computed(() =>
  swimStore.getCardView === "default" ? "orange-darken-2" : "2"
);

const resetState = () => {
  swimStore.$patch({ action: "reset" });
};

const changeCardView = () => {
  if (swimStore.getCardView === "default") {
    swimStore.$patch({ cardView: "small" });
  } else {
    swimStore.$patch({ cardView: "default" });
  }
};

// const saveState = () => {
//   store.$patch({ action: "save" });
// };

const goToSettings = () => {
  router.push("/");
};

const goBack = () => {
  //TODO А всегда есть -1 для текущей страницы? Если нет, то что делаем?
  router.go(-1);
};
</script>

<style scoped></style>
