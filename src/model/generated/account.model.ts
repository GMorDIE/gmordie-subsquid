import {Entity as Entity_, Column as Column_, PrimaryColumn as PrimaryColumn_, OneToMany as OneToMany_, Index as Index_} from "typeorm"
import * as marshal from "./marshal"
import {Transfer} from "./transfer.model"

@Entity_()
export class Account {
    constructor(props?: Partial<Account>) {
        Object.assign(this, props)
    }

    /**
     * Account address
     */
    @PrimaryColumn_()
    id!: string

    @OneToMany_(() => Transfer, e => e.to)
    transfersTo!: Transfer[]

    @OneToMany_(() => Transfer, e => e.from)
    transfersFrom!: Transfer[]

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    sentGMGN!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    receivedGMGN!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    burnedForNothing!: bigint

    @Index_()
    @Column_("numeric", {transformer: marshal.bigintTransformer, nullable: false})
    burnedTotal!: bigint

    @Column_("text", {nullable: true})
    display!: string | undefined | null

    @Column_("text", {nullable: true})
    discord!: string | undefined | null

    @Column_("text", {nullable: true})
    twitter!: string | undefined | null

    @Column_("text", {nullable: true})
    judgement!: string | undefined | null

    @Column_("bool", {nullable: true})
    verified!: boolean | undefined | null
}
