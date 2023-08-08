import { Data } from "../types/templateParachainV3";

export const readRawValue = (data?: Data) => {
  if (data?.__kind === "None") return null;
  return data?.value?.toString() || null;
};
