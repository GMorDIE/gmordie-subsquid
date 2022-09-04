import { CurrenciesFrenBurnedEvent } from "../types/events";
import * as ss58 from "@subsquid/ss58";
import { Ctx } from "./processor";
import { GMORDIE_PREFIX } from "./common";

type FrenBurnedEvent = {
  accountId: string;
  burnedForGM: bigint;
  burnedForGN: bigint;
  burnedForNothing: bigint;
};

export const getFrenBurnedEvents = (ctx: Ctx) => {
  const results: FrenBurnedEvent[] = [];

  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name == "Currencies.FrenBurned") {
        const e = new CurrenciesFrenBurnedEvent(ctx, item.event);
        const { amount, whatTheyGot, who } = e.asV3;

        const result: FrenBurnedEvent = {
          accountId: ss58.codec(GMORDIE_PREFIX).encode(who),
          burnedForGM: BigInt(0),
          burnedForGN: BigInt(0),
          burnedForNothing: BigInt(0),
        };

        if (whatTheyGot?.__kind === "GM") result.burnedForGM = amount;
        else if (whatTheyGot?.__kind === "GN") result.burnedForGN = amount;
        else result.burnedForNothing = amount;

        results.push(result);
      }
    }
  }

  return results;
};
