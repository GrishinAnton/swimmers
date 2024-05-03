<template>
  <v-row class="mr-2" no-gutters>
    <v-col>
      <v-sheet class="pa-2 font-weight-bold">
        {{ swimName }}
      </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="pa-2 font-weight-bold">{{ time }}</v-sheet>
    </v-col>
  </v-row>
  <v-row class="mr-2" no-gutters v-if="interval">
    <v-col>
      <v-sheet class="pa-2 text-caption">посл-й</v-sheet>
      <v-sheet class="pa-2"> {{ lastLapTime }} </v-sheet>
    </v-col>
    <v-col>
      <v-sheet class="d-flex flex-column">
        <v-sheet class="pa-2 text-caption">текущий</v-sheet>
        <v-sheet class="pa-2">{{ actualCircleTime }}</v-sheet>
      </v-sheet>
    </v-col>
  </v-row>

  <v-row class="mr-2" no-gutters v-if="interval">
    <v-col class="d-flex flex-row align-center">
      <v-sheet class="pa-2 text-caption">кругов: </v-sheet
      ><v-sheet class="pa-2 font-weight-bold">
        {{ intervalsPassed }}/{{ interval }}</v-sheet
      >
    </v-col>
  </v-row>
</template>

<script setup lang="ts">
interface IProps {
  swimName: string;
  interval: number | null;
  intervalsPassed: number;
  lastLapTime: string;
  actualCircleTime: string;
  time: string;
}

const {
  actualCircleTime,
  interval,
  intervalsPassed,
  lastLapTime,
  swimName,
  time,
} = defineProps<IProps>();
</script>

<style scoped></style>
