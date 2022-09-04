import { BalancesTransferEvent, TokensTransferEvent } from "../types/events";
import { Ctx } from "./processor";
import * as ss58 from "@subsquid/ss58";
import { GMORDIE_PREFIX } from "./common";

interface TransferEvent {
  id: string;
  blockNumber: number;
  timestamp: Date;
  extrinsicHash?: string;
  from: string;
  to: string;
  amount: bigint;
  fee?: bigint;
  currencyId: "GM" | "GN" | "FREN";
}

export function getTransferEvents(ctx: Ctx): TransferEvent[] {
  let transfers: TransferEvent[] = [];
  for (let block of ctx.blocks) {
    for (let item of block.items) {
      if (item.name == "Balances.Transfer") {
        let e = new BalancesTransferEvent(ctx, item.event);
        const { from, to, amount } = e.asV3;
        const balanceTransfer: TransferEvent = {
          id: item.event.id,
          blockNumber: block.header.height,
          currencyId: "FREN",
          timestamp: new Date(block.header.timestamp),
          extrinsicHash: item.event.extrinsic?.hash,
          from: ss58.codec(GMORDIE_PREFIX).encode(from),
          to: ss58.codec(GMORDIE_PREFIX).encode(to),
          amount: amount,
          fee: item.event.extrinsic?.fee || 0n,
        };

        transfers.push(balanceTransfer);
      }

      if (item.name === "Tokens.Transfer") {
        const e = new TokensTransferEvent(ctx, item.event);
        const { amount, currencyId, from, to } = e.asV3;
        const tokenTransfer: TransferEvent = {
          id: item.event.id,
          blockNumber: block.header.height,
          currencyId: currencyId.__kind,
          timestamp: new Date(block.header.timestamp),
          extrinsicHash: item.event.extrinsic?.hash,
          from: ss58.codec(GMORDIE_PREFIX).encode(from),
          to: ss58.codec(GMORDIE_PREFIX).encode(to),
          amount: amount,
          fee: item.event.extrinsic?.fee || 0n,
        };

        transfers.push(tokenTransfer);
      }
    }
  }
  return transfers;
}
