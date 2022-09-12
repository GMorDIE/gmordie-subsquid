import {
  IdentityIdentityClearedEvent,
  IdentityIdentityKilledEvent,
  IdentityIdentitySetEvent,
  IdentityJudgementGivenEvent,
} from "../types/events";
import * as ss58 from "@subsquid/ss58";
import { Ctx } from "./processor";
import { GMORDIE_PREFIX } from "./common";

type JudgementEvent = {
  accountId: string;
};

export const getJudgementEvents = (ctx: Ctx) => {
  const results: JudgementEvent[] = [];

  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name == "Identity.JudgementGiven") {
        const e = new IdentityJudgementGivenEvent(ctx, item.event);
        const { target } = e.asV3;
        results.push({
          accountId: ss58.codec(GMORDIE_PREFIX).encode(target),
        });
      }
      if (item.name === "Identity.IdentityKilled") {
        const e = new IdentityIdentityKilledEvent(ctx, item.event);
        const { who } = e.asV3;
        results.push({
          accountId: ss58.codec(GMORDIE_PREFIX).encode(who),
        });
      }
      if (item.name === "Identity.IdentityCleared") {
        const e = new IdentityIdentityClearedEvent(ctx, item.event);
        const { who } = e.asV3;
        results.push({
          accountId: ss58.codec(GMORDIE_PREFIX).encode(who),
        });
      }
      if (item.name === "Identity.IdentitySet") {
        const e = new IdentityIdentitySetEvent(ctx, item.event);
        const { who } = e.asV3;
        results.push({
          accountId: ss58.codec(GMORDIE_PREFIX).encode(who),
        });
      }
    }
  }

  return results;
};
