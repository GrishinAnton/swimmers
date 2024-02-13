import { defineStore } from "pinia";

export interface ISettings {
  distance: number | null;
  in: number | null;
  swimmers: number[] | null;
}

export const defaultSettings: ISettings = {
  distance: null,
  in: null,
  swimmers: null,
};

export const useSettingsStore = defineStore("settings", {
  state: (): ISettings => ({ ...defaultSettings }),
  getters: {
    getState: (state) => state,
  },
  actions: {
    setState(obj: ISettings) {
      this.distance = obj.distance;
      this.in = obj.in;
      this.swimmers = obj.swimmers;
    },
  },
});
