import { TypeormDatabase } from "@subsquid/typeorm-store";
import { In } from "typeorm";
import { Account, Transfer } from "../model";
import {
  IdentityIdentityOfStorage,
  SystemAccountStorage,
  TokensAccountsStorage,
} from "../types/storage";
import { getAccount } from "./getAccount";
import { getFrenBurnedEvents } from "./getFrenBurnedEvents";
import { getTransferEvents } from "./getTransferEvents";
import { processor } from "./processor";
import * as ss58 from "@subsquid/ss58";
import { GMORDIE_PREFIX } from "./common";
import { readRawValue } from "./readRawValue";
import { getIdentity } from "./getIdentity";

processor.run(new TypeormDatabase(), async (ctx) => {
  const transfersData = getTransferEvents(ctx);
  const frenBurnedData = getFrenBurnedEvents(ctx);

  const accountIds = new Set<string>();
  for (let t of transfersData) {
    accountIds.add(t.from);
    accountIds.add(t.to);
  }
  for (const fb of frenBurnedData) accountIds.add(fb.accountId);

  const accounts = await ctx.store
    .findBy(Account, { id: In([...accountIds]) })
    .then((accounts) => {
      return new Map(accounts.map((a) => [a.id, a]));
    });

  const transfers: Transfer[] = [];

  for (const t of transfersData) {
    const {
      id,
      blockNumber,
      timestamp,
      extrinsicHash,
      amount,
      fee,
      currencyId,
    } = t;

    const from = getAccount(accounts, t.from);
    const to = getAccount(accounts, t.to);

    transfers.push(
      new Transfer({
        id,
        blockNumber,
        timestamp,
        extrinsicHash,
        from,
        to,
        amount,
        fee,
        currency: currencyId,
      })
    );

    if (currencyId === "GM") {
      from.sentGM += amount;
      from.sentGMGN += amount;
      to.receivedGM += amount;
      to.receivedGMGN += amount;
    } else if (currencyId === "GN") {
      from.sentGN += amount;
      from.sentGMGN += amount;
      to.receivedGN += amount;
      to.receivedGMGN += amount;
    }
  }

  for (const fb of frenBurnedData) {
    const account = getAccount(accounts, fb.accountId);
    account.burnedForGM += fb.burnedForGM;
    account.burnedForGN += fb.burnedForGN;
    account.burnedForGMGN += fb.burnedForGM + fb.burnedForGN;
    account.burnedForNothing += fb.burnedForNothing;
    account.burnedTotal +=
      fb.burnedForGM + fb.burnedForGN + fb.burnedForNothing;
  }

  // update balances of involved accounts
  const arAccountIds = [...accountIds];
  if (arAccountIds.length) {
    const block = ctx.blocks[ctx.blocks.length - 1];

    const sysAccountStorage = new SystemAccountStorage(ctx, block.header);
    const tokensStorage = new TokensAccountsStorage(ctx, block.header);
    const identityOfStorage = new IdentityIdentityOfStorage(ctx, block.header);

    const [frenData, gmData, gnData, identityOfData] = await Promise.all([
      sysAccountStorage.getManyAsV3(
        arAccountIds.map((a) => ss58.codec(GMORDIE_PREFIX).decode(a))
      ),
      tokensStorage.getManyAsV3(
        arAccountIds.map((a) => [
          ss58.codec(GMORDIE_PREFIX).decode(a),
          { __kind: "GM" },
        ])
      ),
      tokensStorage.getManyAsV3(
        arAccountIds.map((a) => [
          ss58.codec(GMORDIE_PREFIX).decode(a),
          { __kind: "GN" },
        ])
      ),
      identityOfStorage.getManyAsV3(
        arAccountIds.map((a) => ss58.codec(GMORDIE_PREFIX).decode(a))
      ),
    ]);

    for (let i = 0; i < arAccountIds.length; i++) {
      const accountId = arAccountIds[i];
      const account = getAccount(accounts, accountId);

      const fren = frenData[i];
      const gm = gmData[i];
      const gn = gnData[i];

      account.balanceFREN = fren.data.free + fren.data.reserved;
      account.balanceGM = gm.free + gm.reserved + gm.frozen;
      account.balanceGN = gn.free + gn.reserved + gn.frozen;
      account.balanceGMGN = account.balanceGM + account.balanceGN;

      const identity = identityOfData[i];
      const { display, discord, twitter, verified } = getIdentity(identity);

      account.display = display;
      account.discord = discord;
      account.twitter = twitter;
      account.verified = verified;
    }
  }

  await ctx.store.save(Array.from(accounts.values()));
  await ctx.store.insert(transfers);
});
