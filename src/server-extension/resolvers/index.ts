import {
  Arg,
  Field,
  Info,
  ObjectType,
  Query,
  registerEnumType,
  Resolver,
} from "type-graphql";
import { GraphQLResolveInfo } from "graphql";
import graphqlFields from "graphql-fields";
import "reflect-metadata";
import type { EntityManager } from "typeorm";
import { Account as AccountModel } from "../../model";
import { toSnakeCase } from "@subsquid/util-naming";

@ObjectType()
class Account implements Omit<AccountModel, "transfersTo" | "transfersFrom"> {
  constructor(props?: Partial<Account>) {
    Object.assign(this, props);
  }

  @Field(() => String, { nullable: false })
  id!: string;

  @Field(() => BigInt, { nullable: false })
  sentGMGN!: bigint;

  @Field(() => BigInt, { nullable: false })
  receivedGMGN!: bigint;

  @Field(() => BigInt, { nullable: false })
  burnedForNothing!: bigint;

  @Field(() => BigInt, { nullable: false })
  burnedTotal!: bigint;

  @Field(() => String, { nullable: true })
  display!: string | undefined | null;

  @Field(() => String, { nullable: true })
  discord!: string | undefined | null;

  @Field(() => String, { nullable: true })
  twitter!: string | undefined | null;

  @Field(() => String, { nullable: true })
  judgement!: string | undefined | null;

  @Field(() => Boolean, { nullable: true })
  verified!: boolean | undefined | null;
}

@ObjectType()
class RankedAccount {
  constructor(props?: Partial<RankedAccount>) {
    Object.assign(this, props);
  }

  @Field(() => Number, { nullable: false })
  rank!: number;

  @Field(() => Account, { nullable: false })
  account!: Account;
}

enum RankBy {
  sent = "sent_gmgn",
  received = "received_gmgn",
}

enum SortDirection {
  DESC = "DESC",
  ASC = "ASC",
}

registerEnumType(RankBy, { name: "RankBy" });
registerEnumType(SortDirection, { name: "SortDirection" });

@Resolver()
export class AccountRank {
  constructor(private tx: () => Promise<EntityManager>) {}

  @Query(() => RankedAccount, { nullable: true })
  async rankAccount(
    @Arg("id", { nullable: false })
    id: string,
    @Arg("rankedBy", () => RankBy, { nullable: false })
    rankBy: RankBy,
    @Arg("orderDirection", () => SortDirection, { nullable: false })
    orderDirection: SortDirection,
    @Info()
    info: GraphQLResolveInfo
  ): Promise<RankedAccount | null> {
    const manager = await this.tx();
    const repository = manager.getRepository(AccountModel);

    const requestedFields = graphqlFields(info).account;
    requestedFields.id = {};
    const query = Object.keys(requestedFields).map(
      (k) => `${toSnakeCase(k)} AS "${k}"`
    );

    const data = (
      await repository.query(
        `SELECT * FROM (
                    SELECT 
                        ${query.join(`, `)}, 
                        ROW_NUMBER() OVER (ORDER BY ${rankBy} ${orderDirection}, id ASC) AS "rank"
                    FROM account
                ) as ranked
                WHERE id = '${id}'`
      )
    )?.[0];

    if (data != null) {
      const { rank, ...account } = data;
      return new RankedAccount({ rank, account: new Account(account) });
    } else {
      return null;
    }
  }
}
