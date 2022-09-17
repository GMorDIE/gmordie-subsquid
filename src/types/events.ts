import assert from 'assert'
import {Chain, ChainContext, EventContext, Event, Result} from './support'
import * as v3 from './v3'

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

export class IdentityIdentityClearedEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Identity.IdentityCleared')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A name was cleared, and the given balance returned.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Identity.IdentityCleared') === '569627bf2a8105e3949fd62dcaae8174fb02f8afedb8e5d8a7fecda5d63b25c3'
  }

  /**
   * A name was cleared, and the given balance returned.
   */
  get asV3(): {who: Uint8Array, deposit: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class IdentityIdentityKilledEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Identity.IdentityKilled')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A name was removed and the given balance slashed.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Identity.IdentityKilled') === '569627bf2a8105e3949fd62dcaae8174fb02f8afedb8e5d8a7fecda5d63b25c3'
  }

  /**
   * A name was removed and the given balance slashed.
   */
  get asV3(): {who: Uint8Array, deposit: bigint} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class IdentityIdentitySetEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Identity.IdentitySet')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A name was set or reset (which will remove all judgements).
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Identity.IdentitySet') === 'b8a0d2208835f6ada60dd21cd93533d703777b3779109a7c6a2f26bad68c2f3b'
  }

  /**
   * A name was set or reset (which will remove all judgements).
   */
  get asV3(): {who: Uint8Array} {
    assert(this.isV3)
    return this._chain.decodeEvent(this.event)
  }
}

export class IdentityJudgementGivenEvent {
  private readonly _chain: Chain
  private readonly event: Event

  constructor(ctx: EventContext)
  constructor(ctx: ChainContext, event: Event)
  constructor(ctx: EventContext, event?: Event) {
    event = event || ctx.event
    assert(event.name === 'Identity.JudgementGiven')
    this._chain = ctx._chain
    this.event = event
  }

  /**
   * A judgement was given by a registrar.
   */
  get isV3(): boolean {
    return this._chain.getEventHash('Identity.JudgementGiven') === '0771fa05d0977d28db0dee420efa5c006fa01a48edbd0b5b50cba5ea1d98b1b8'
  }

  /**
   * A judgement was given by a registrar.
   */
  get asV3(): {target: Uint8Array, registrarIndex: number} {
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
