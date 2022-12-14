import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';

export type Result = { 'ok' : bigint } |
  { 'err' : string };
export interface TicketGenerator {
  'generate' : ActorMethod<[Principal], Result>,
  'greet' : ActorMethod<[string], string>,
}
export interface _SERVICE extends TicketGenerator {}
