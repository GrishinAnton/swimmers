<template>
  <v-btn
    :color="buttonColor"
    class="mr-3"
    append-icon="mdi-clock-outline"
    :disabled="buttonDisabled"
    @click="handleOp"
    >{{ timerValue }}</v-btn
  >
</template>

<script setup lang="ts">
import { computed, ref, watch } from "vue";
import { useSwimStore } from "@/features/swim/swimStore";

const swimStore = useSwimStore();

const interval = ref();
const time = ref<number>(0);

const buttonDisabled = computed(() => Boolean(time.value));

const buttonColor = computed(() => {
  if (time.value === 10) {
    return "error";
  } else {
    return "green";
  }
});

const timerValue = computed(() => {
  if (time.value === 10) {
    return "Стоп";
  } else if (time.value) {
    return 10 - time.value;
  } else {
    return "Оп";
  }
});

const startInterval = () => {
  interval.value = setInterval(() => {
    time.value += 1000 * 0.001;
  }, 1000);
};

const handleOp = () => {
  swimStore.$patch({ action: null });
  startInterval();
};

const handleResetTimer = () => {
  clearInterval(interval.value);
  time.value = 0;
};

watch(
  () => time.value,
  () => {
    if (time.value === 10) {
      clearInterval(interval.value);
    }
  }
);

watch(
  () => swimStore.action,
  () => {
    if (swimStore.action === "reset") {
      handleResetTimer();
      time.value = 0;
    }
  }
);
</script>

<style scoped></style>
