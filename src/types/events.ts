import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v3 from './v3'

export class BalancesTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Balances.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transfer succeeded.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Balances.Transfer') === '0ffdf35c495114c2d42a8bf6c241483fd5334ca0198662e14480ad040f1e3a66'
  }

  /**
   * Transfer succeeded.
   */
  get asV3(): {from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class CurrenciesFrenBurnedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Currencies.FrenBurned')
    this._chain = ctx._chain
    this.event = event
  }

  get isV3(): boolean {
    return this._chain.getEventHash('Currencies.FrenBurned') === '499ddef7919eadb13b220af048f584dacbb3f2270f501061df23e5d0cf595bdd'
  }

  get asV3(): {who: Uint8Array, amount: bigint, whatTheyGot: (v3.Coooooins | undefined)} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class TokensTransferEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Tokens.Transfer')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * Transfer succeeded.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Tokens.Transfer') === '5147c1f931cd815f1c15f0110bbf110e0445ce1c0bbd5617444550af2be6d431'
  }

  /**
   * Transfer succeeded.
   */
  get asV3(): {currencyId: v3.Coooooins, from: Uint8Array, to: Uint8Array, amount: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}
