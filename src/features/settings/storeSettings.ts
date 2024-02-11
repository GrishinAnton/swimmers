import { defineStore } from "pinia";
import { IDistance } from "../../components/common/dictionary/distance";
import { IInha } from "../../components/common/dictionary/inha";
import { ISwimmer } from "../../components/common/dictionary/swimmers";

export interface ISettings {
  distance: IDistance | null;
  in: IInha | null;
  swimmers: ISwimmer[] | null;
}

export const defaultSettings: ISettings = {
  distance: null,
  in: null,
  swimmers: null,
};

export const useSettingsStore = defineStore("settings", {
  state: (): ISettings => defaultSettings,
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
