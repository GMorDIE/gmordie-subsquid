import { lookupArchive } from "@subsquid/archive-registry";
import {
  BatchContext,
  BatchProcessorItem,
  SubstrateBatchProcessor,
} from "@subsquid/substrate-processor";
import { Store } from "@subsquid/typeorm-store";

export const processor = new SubstrateBatchProcessor()
  .setBatchSize(500)
  .setDataSource({
    // Lookup archive by the network name in the Subsquid registry
    archive: lookupArchive("gmordie", {
      release: "FireSquid",
      genesis:
        "0x19a3733beb9cb8a970a308d835599e9005e02dc007a35440e461a451466776f8",
    }),
    // specify chain RPC for storage queries
    chain: "wss://ws.gm.bldnodes.org",
  })
  .addEvent("Balances.Transfer", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const)
  .addEvent("Tokens.Transfer", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const)
  .addEvent("Currencies.FrenBurned", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const)
  .addEvent("Identity.IdentitySet", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const)
  .addEvent("Identity.IdentityKilled", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const)
  .addEvent("Identity.IdentityCleared", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const)
  .addEvent("Identity.JudgementGiven", {
    data: {
      event: {
        args: true,
        extrinsic: {
          hash: true,
          fee: true,
        },
      },
    },
  } as const);

export type Item = BatchProcessorItem<typeof processor>;
export type Ctx = BatchContext<Store, Item>;
