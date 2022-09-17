import assert from 'assert'
import {Block, Chain, ChainContext, BlockContext, Result} from './support'
import * as v3 from './v3'

export class IdentityIdentityOfStorage {
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
   *  Information that is pertinent to identify the entity behind an account.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  get isV3() {
    return this._chain.getStorageItemTypeHash('Identity', 'IdentityOf') === 'eee9529c5197f7a5f8200e155d78bab0a612de49bd6c8941e539265edf54c3aa'
  }

  /**
   *  Information that is pertinent to identify the entity behind an account.
   * 
   *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
   */
  async getAsV3(key: Uint8Array): Promise<v3.Registration | undefined> {
    assert(this.isV3)
    return this._chain.getStorage(this.blockHash, 'Identity', 'IdentityOf', key)
  }

  async getManyAsV3(keys: Uint8Array[]): Promise<(v3.Registration | undefined)[]> {
    assert(this.isV3)
    return this._chain.queryStorage(this.blockHash, 'Identity', 'IdentityOf', keys.map(k => [k]))
  }

  /**
   * Checks whether the storage item is defined for the current chain version.
   */
  get isExists(): boolean {
    return this._chain.getStorageItemTypeHash('Identity', 'IdentityOf') != null
  }
}
