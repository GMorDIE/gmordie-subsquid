import {Arg, Field, Info, ObjectType, Query, registerEnumType, Resolver} from "type-graphql";
import { GraphQLResolveInfo } from 'graphql'
import graphqlFields from 'graphql-fields'
import "reflect-metadata";
import type {EntityManager} from "typeorm";
import {Account as AccountModel} from "../../model";
import {toSnakeCase} from "@subsquid/util-naming";

@ObjectType()
class Account implements Omit<AccountModel, 'transfersTo' | 'transfersFrom'> {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props);
    }

    @Field(() => String, {nullable: false, })
    id!: string;

    @Field(() => BigInt, {nullable: false})
    sentGM!: bigint

    @Field(() => BigInt, {nullable: false})
    sentGN!: bigint

    @Field(() => BigInt, {nullable: false})
    sentGMGN!: bigint

    @Field(() => BigInt, {nullable: false})
    receivedGM!: bigint

    @Field(() => BigInt, {nullable: false})
    receivedGN!: bigint

    @Field(() => BigInt, {nullable: false})
    receivedGMGN!: bigint

    @Field(() => BigInt, {nullable: false})
    burnedForGM!: bigint

    @Field(() => BigInt, {nullable: false})
    burnedForGN!: bigint

    @Field(() => BigInt, {nullable: false})
    burnedForGMGN!: bigint

    @Field(() => BigInt, {nullable: false})
    burnedForNothing!: bigint

    @Field(() => BigInt, {nullable: false})
    burnedTotal!: bigint

    @Field(() => BigInt, {nullable: false})
    balanceGM!: bigint

    @Field(() => BigInt, {nullable: false})
    balanceGN!: bigint

    @Field(() => BigInt, {nullable: false})
    balanceGMGN!: bigint

    @Field(() => BigInt, {nullable: false})
    balanceFREN!: bigint
}

@ObjectType()
class RankedAccount {
    constructor(props?: Partial<RankedAccount>) {
        Object.assign(this, props);
    }

    @Field(() => Number, {nullable: false})
    rank!: number;

    @Field(() => Account, {nullable: false})
    account!: Account;
}

enum RankBy {
    sent = 'sent_gmgn',
    received = 'received_gmgn',
    balance = 'balance_gmgn',
} 

registerEnumType(RankBy, {name: 'RankBy'})

@Resolver()
export class AccountRank {
    constructor(private tx: () => Promise<EntityManager>) {}

    @Query(() => RankedAccount, {nullable: true})
    async rankAccount(
        @Arg("id", {nullable: false})
        id: string,
        @Arg("rankedBy",() => RankBy, {nullable: false})
        rankBy: RankBy,
        @Info()
        info: GraphQLResolveInfo
    ): Promise<RankedAccount | null> {
        const manager = await this.tx();
        const repository = manager.getRepository(AccountModel);

        const requestedFields = graphqlFields(info).account
        requestedFields.id = {}
        const query = Object.keys(requestedFields).map((k) => `${toSnakeCase(k)} AS "${k}"`)
        
        const data = (
            await repository.query(
                `SELECT * FROM (
                    SELECT 
                        ${query.join(`, `)}, 
                        ROW_NUMBER() OVER (ORDER BY ${rankBy} DESC, id ASC) AS "rank"
                    FROM account
                ) as ranked
                WHERE id = '${id}'`
            )
        )?.[0];

        if (data != null) {
            const {rank, ...account} = data;
            return new RankedAccount({rank, account: new Account(account)});
        } else {
            return null;
        }
    }
}
