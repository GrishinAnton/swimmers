export const getFullTImeValue = (value: number): string => {
  let ms = (value % 1000) * 0.1;
  let s = Math.floor(value / 1000) % 60;
  let m = Math.floor(value / 60000) % 60;

  return m + ":" + s + ":" + ms;
};

export const defaultTimeValue = "0:0:0";

export type TTimerStatus = "start" | "stop" | "reset";
