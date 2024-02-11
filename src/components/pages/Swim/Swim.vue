<template>
  <div>
    <v-container class="pa-2">
      <v-card
        class="pa-1 mb-2"
        variant="outlined"
        v-for="n in swimmers"
        v-if="swimmers"
        :key="n.id"
      >
        <v-row align="center" justify="space-between" no-gutters>
          <v-col
            ><div>{{ n.name }}</div></v-col
          >
          <v-col
            ><v-btn class="mr-2" border height="60" variant="text" width="120"
              >Старт</v-btn
            ></v-col
          >
        </v-row>
      </v-card>
      <div v-else>Сначала надо выбрать пловцов</div>
    </v-container>
  </div>
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
import { useSettingsStore } from "../../../features/settings/storeSettings";

const {
  getState: { swimmers },
} = useSettingsStore();
const router = useRouter();

const goToSettings = () => {
  router.push("/");
};
</script>

<style scoped></style>
