import { defineStore } from "pinia";

type TSwimActionType = "reset" | "save" | null;
export interface ISwimStore {
  action: TSwimActionType;
  isAllTimerStop: boolean;
}

export const defaultSwimState: ISwimStore = {
  action: null,
  isAllTimerStop: true,
};

export const useSwimStore = defineStore("swim", {
  state: (): ISwimStore => ({ ...defaultSwimState }),
  getters: {
    getAction: (state): TSwimActionType => state.action,
    getIsAllTimerStop: (state): boolean => state.isAllTimerStop,
  },
  actions: {
    setAction({ action }: { action: TSwimActionType }) {
      this.action = action;
    },
    setAllTimerStop({ isAllTimerStop }: { isAllTimerStop: boolean }) {
      this.isAllTimerStop = isAllTimerStop;
    },
  },
});
