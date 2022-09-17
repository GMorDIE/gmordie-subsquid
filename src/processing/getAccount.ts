import { Account } from "../model";

export function getAccount(m: Map<string, Account>, id: string) {
  let acc = m.get(id);
  if (acc == null) {
    acc = new Account();
    acc.id = id;
    acc.receivedGMGN = BigInt(0);
    acc.sentGMGN = BigInt(0);
    acc.burnedForNothing = BigInt(0);
    acc.burnedTotal = BigInt(0);
    m.set(id, acc);
  }
  return acc;
}
