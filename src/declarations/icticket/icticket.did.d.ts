import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'ok' : bigint } |
  { 'err' : string };
export interface Ticket {
  'owner' : Principal,
  'statement' : string,
  'generatedAt' : bigint,
}
export interface TicketGenerator {
  'generate' : ActorMethod<[Principal], Result>,
  'getOwner' : ActorMethod<[bigint], [] | [Ticket]>,
  'greet' : ActorMethod<[string], string>,
  'multipleGenerate' : ActorMethod<[Principal, bigint], Array<bigint>>,
  'whoami' : ActorMethod<[], Principal>,
}
export interface _SERVICE extends TicketGenerator {}
