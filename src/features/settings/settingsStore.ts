import { defineStore } from "pinia";

export interface ISettings {
  distance: number | null;
  in: number | null;
  swimmers: number[] | null;
  interval: number | null;
}

export const defaultSettingsState: ISettings = {
  distance: null,
  in: null,
  swimmers: null,
  interval: null,
};

export const useSettingsStore = defineStore("settings", {
  state: (): ISettings => ({ ...defaultSettingsState }),
  getters: {
    getState: (state) => state,
  },
  actions: {
    setState(obj: ISettings) {
      this.distance = obj.distance;
      this.in = obj.in;
      this.swimmers = obj.swimmers;
      this.interval = obj.interval ?? null;
    },
  },
});
