import type {Result} from './support'

export type Coooooins = Coooooins_FREN | Coooooins_GM | Coooooins_GN

export interface Coooooins_FREN {
  __kind: 'FREN'
}

export interface Coooooins_GM {
  __kind: 'GM'
}

export interface Coooooins_GN {
  __kind: 'GN'
}

export interface AccountInfo {
  nonce: number
  consumers: number
  providers: number
  sufficients: number
  data: AccountData
}

export interface Type_271 {
  free: bigint
  reserved: bigint
  frozen: bigint
}

export interface AccountData {
  free: bigint
  reserved: bigint
  miscFrozen: bigint
  feeFrozen: bigint
}
