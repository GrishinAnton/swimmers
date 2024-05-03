import { defineStore } from "pinia";

type TSwimActionType = "reset" | "save" | null;
type TCardView = "small" | "default";
export interface ISwimStore {
  action: TSwimActionType;
  isAllTimerStop: boolean;
  cardView: TCardView;
}

export const defaultSwimState: ISwimStore = {
  action: null,
  isAllTimerStop: true,
  cardView: "small",
};

export const useSwimStore = defineStore("swim", {
  state: (): ISwimStore => ({ ...defaultSwimState }),
  getters: {
    getAction: (state): TSwimActionType => state.action,
    getIsAllTimerStop: (state): boolean => state.isAllTimerStop,
    getCardView: (state): TCardView => state.cardView,
  },
  actions: {
    setAction({ action }: { action: TSwimActionType }) {
      this.action = action;
    },
    setAllTimerStop({ isAllTimerStop }: { isAllTimerStop: boolean }) {
      this.isAllTimerStop = isAllTimerStop;
    },
    setCardView({ cardView }: { cardView: TCardView }) {
      this.cardView = cardView;
    },
  },
});
