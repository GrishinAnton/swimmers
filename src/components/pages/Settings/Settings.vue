<script setup lang="ts">
import Distance from "../../Ui/Distance/Distance.vue";
import In from "../../Ui/In/In.vue";
import Swimmers from "../../Ui/Swimmers/Swimmers.vue";
</script>

<template>
  <Distance />
  <In />
  <Swimmers />
  <div class="mb-6">
    <v-btn class="mr-2" border height="60" variant="text" width="120"
      >Сбросить</v-btn
    >
    <v-btn class="mr-2" border height="60" variant="text" width="120"
      >Старт</v-btn
    >
  </div>
</template>
