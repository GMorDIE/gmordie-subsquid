import { Account } from "../model";

export function getAccount(m: Map<string, Account>, id: string) {
  let acc = m.get(id);
  if (acc == null) {
    acc = new Account();
    acc.id = id;
    acc.receivedGM = BigInt(0);
    acc.receivedGN = BigInt(0);
    acc.receivedGMGN = BigInt(0);
    acc.sentGM = BigInt(0);
    acc.sentGN = BigInt(0);
    acc.sentGMGN = BigInt(0);
    acc.burnedForGM = BigInt(0);
    acc.burnedForGN = BigInt(0);
    acc.burnedForGMGN = BigInt(0);
    acc.burnedForNothing = BigInt(0);
    acc.burnedTotal = BigInt(0);
    acc.balanceFREN = BigInt(0);
    acc.balanceGM = BigInt(0);
    acc.balanceGN = BigInt(0);
    acc.balanceGMGN = BigInt(0);
    m.set(id, acc);
  }
  return acc;
}
