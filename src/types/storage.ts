import assert from 'assert'
import {Block, BlockContext, Chain, ChainContext, Option, Result, StorageBase} from './support'
import * as templateParachainV3 from './templateParachainV3'

export class IdentityIdentityOfStorage extends StorageBase {
    protected getPrefix() {
        return 'Identity'
    }

    protected getName() {
        return 'IdentityOf'
    }

    /**
     *  Information that is pertinent to identify the entity behind an account.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    get isTemplateParachainV3(): boolean {
        return this.getTypeHash() === 'eee9529c5197f7a5f8200e155d78bab0a612de49bd6c8941e539265edf54c3aa'
    }

    /**
     *  Information that is pertinent to identify the entity behind an account.
     * 
     *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
     */
    get asTemplateParachainV3(): IdentityIdentityOfStorageTemplateParachainV3 {
        assert(this.isTemplateParachainV3)
        return this as any
    }
}

/**
 *  Information that is pertinent to identify the entity behind an account.
 * 
 *  TWOX-NOTE: OK ― `AccountId` is a secure hash.
 */
export interface IdentityIdentityOfStorageTemplateParachainV3 {
    get(key: Uint8Array): Promise<(templateParachainV3.Registration | undefined)>
    getAll(): Promise<templateParachainV3.Registration[]>
    getMany(keys: Uint8Array[]): Promise<(templateParachainV3.Registration | undefined)[]>
    getKeys(): Promise<Uint8Array[]>
    getKeys(key: Uint8Array): Promise<Uint8Array[]>
    getKeysPaged(pageSize: number): AsyncIterable<Uint8Array[]>
    getKeysPaged(pageSize: number, key: Uint8Array): AsyncIterable<Uint8Array[]>
    getPairs(): Promise<[k: Uint8Array, v: templateParachainV3.Registration][]>
    getPairs(key: Uint8Array): Promise<[k: Uint8Array, v: templateParachainV3.Registration][]>
    getPairsPaged(pageSize: number): AsyncIterable<[k: Uint8Array, v: templateParachainV3.Registration][]>
    getPairsPaged(pageSize: number, key: Uint8Array): AsyncIterable<[k: Uint8Array, v: templateParachainV3.Registration][]>
}
