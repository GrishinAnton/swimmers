import { defineStore } from "pinia";

export interface ISwimStore {
  action: "reset" | "save" | null;
}

export const defaultSettings: ISwimStore = {
  action: null,
};

export const useSwimStore = defineStore("swim", {
  state: (): ISwimStore => ({ ...defaultSettings }),
  getters: {
    getState: (state) => state,
  },
  actions: {
    setState(obj: ISwimStore) {
      this.action = obj.action;
    },
  },
});
