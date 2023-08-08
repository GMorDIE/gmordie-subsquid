import { Registration } from "../types/templateParachainV3";
import { readRawValue } from "./readRawValue";

const getDiscord = (registration?: Registration) => {
  const field = registration?.info?.additional?.find(
    ([key]) => readRawValue(key) === "discord"
  );
  if (!field) return null;

  const [, value] = field;
  return readRawValue(value);
};

const getJudgement = (registration?: Registration) => {
  if (registration?.judgements?.some(([, j]) => j.__kind === "KnownGood"))
    return "KnownGood";
  else if (registration?.judgements?.some(([, j]) => j.__kind === "Reasonable"))
    return "Reasonable";
  else return registration?.judgements?.length ? "Unknown" : null;
};

export const getIdentity = (registration?: Registration) => {
  if (!registration)
    return { display: null, twitter: null, discord: null, verified: false };

  const judgement = getJudgement(registration);
  const verified = judgement === "KnownGood";

  return {
    display: readRawValue(registration?.info.display) ?? null,
    twitter: readRawValue(registration?.info.twitter) ?? null,
    discord: getDiscord(registration),
    judgement,
    verified,
  };
};
