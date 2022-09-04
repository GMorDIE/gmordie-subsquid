import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v3 from './v3'

export class SystemAccountStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The full account information for a particular account ID.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('System', 'Account') === '1ddc7ade926221442c388ee4405a71c9428e548fab037445aaf4b3a78f4735c1'
  }

  /**
   *  The full account information for a particular account ID.
   */
  async getAsV3(key: Uint8Array): Promise<v3.AccountInfo> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'System', 'Account', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.AccountInfo)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'System', 'Account', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('System', 'Account') != null
  }
}

export class TokensAccountsStorage {
  private readonly _chain: Chain
  private readonly blockHash: string

  constructor(ctx: BlockContext)
  constructor(ctx: ChainContext, block: Block)
  constructor(ctx: BlockContext, block?: Block) {
    block = block || ctx.block
    this.blockHash = block.hash
    this._chain = ctx._chain
  }

  /**
   *  The balance of a token type under an account.
   * 
   *  NOTE: If the total is ever zero, decrease account ref account.
   * 
   *  NOTE: This is only used in the case that this module is used to store
   *  balances.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') === 'a79ce6e761085349b0be2e1172c8129f1b45857a1e6917dacd1f11594d5511ba'
  }

  /**
   *  The balance of a token type under an account.
   * 
   *  NOTE: If the total is ever zero, decrease account ref account.
   * 
   *  NOTE: This is only used in the case that this module is used to store
   *  balances.
   */
  async getAsV3(key1: Uint8Array, key2: v3.Coooooins): Promise<v3.Type_271> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Tokens', 'Accounts', key1, key2)
  }

  async getManyAsV3(keys: [Uint8Array, v3.Coooooins][]): Promise<(v3.Type_271)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Tokens', 'Accounts', keys)
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Tokens', 'Accounts') != null
  }
}
