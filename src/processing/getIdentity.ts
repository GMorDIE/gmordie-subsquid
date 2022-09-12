import { Registration } from "../types/v3";
import { readRawValue } from "./readRawValue";

const getDiscord = (registration?: Registration) => {
  const field = registration?.info?.additional?.find(
    ([key]) => readRawValue(key) === "discord"
  );
  if (!field) return null;

  const [, value] = field;
  return readRawValue(value);
};

const getVerified = (registration?: Registration) =>
  registration?.judgements?.some(([, j]) => j.__kind === "KnownGood");

export const getIdentity = (registration?: Registration) => {
  if (!registration)
    return { display: null, twitter: null, discord: null, verified: false };

  return {
    display: readRawValue(registration?.info.display) ?? null,
    twitter: readRawValue(registration?.info.twitter) ?? null,
    discord: getDiscord(registration),
    verified: getVerified(registration),
  };
};
