/* tslint:disable */
/* eslint-disable */
/**
* @param {number} n
* @param {boolean} anti
* @returns {string}
*/
export function vonkoch(n: number, anti: boolean): string;
/**
* @param {number} n
* @returns {string}
*/
export function sierp(n: number): string;
/**
* @param {number} n
* @param {number} theta
* @param {number} branch_length
* @param {number} branch_multiplier
* @returns {string}
*/
export function tree(n: number, theta: number, branch_length: number, branch_multiplier: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly vonkoch: (a: number, b: number, c: number) => void;
  readonly sierp: (a: number, b: number) => void;
  readonly tree: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number, c: number) => void;
}

export type SyncInitInput = BufferSource | WebAssembly.Module;
/**
* Instantiates the given `module`, which can either be bytes or
* a precompiled `WebAssembly.Module`.
*
* @param {SyncInitInput} module
*
* @returns {InitOutput}
*/
export function initSync(module: SyncInitInput): InitOutput;

/**
* If `module_or_path` is {RequestInfo} or {URL}, makes a request and
* for everything else, calls `WebAssembly.instantiate` directly.
*
* @param {InitInput | Promise<InitInput>} module_or_path
*
* @returns {Promise<InitOutput>}
*/
export default function __wbg_init (module_or_path?: InitInput | Promise<InitInput>): Promise<InitOutput>;
