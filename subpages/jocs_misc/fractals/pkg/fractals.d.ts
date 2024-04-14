/* tslint:disable */
/* eslint-disable */
/**
* @param {number} n
* @param {number} theta
* @param {number} side_length
* @returns {string}
*/
export function pythagorean_tree(n: number, theta: number, side_length: number): string;
/**
* @param {number} n
* @param {number} theta
* @param {number} branch_length
* @param {number} branch_multiplier
* @returns {string}
*/
export function tree(n: number, theta: number, branch_length: number, branch_multiplier: number): string;
/**
* @param {number} n
* @returns {string}
*/
export function sierp(n: number): string;
/**
* @param {number} n
* @param {boolean} anti
* @returns {string}
*/
export function vonkoch(n: number, anti: boolean): string;
/**
* @param {number} n
* @param {string} axiom
* @param {any} rules
* @param {any} turtle_mapping
* @param {number} start_x
* @param {number} start_y
* @param {number} start_direction
* @param {number} line_length
* @returns {string}
*/
export function generate_l_fractal(n: number, axiom: string, rules: any, turtle_mapping: any, start_x: number, start_y: number, start_direction: number, line_length: number): string;

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly pythagorean_tree: (a: number, b: number, c: number, d: number) => void;
  readonly tree: (a: number, b: number, c: number, d: number, e: number) => void;
  readonly sierp: (a: number, b: number) => void;
  readonly vonkoch: (a: number, b: number, c: number) => void;
  readonly generate_l_fractal: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number) => void;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_2: (a: number, b: number, c: number) => void;
  readonly __wbindgen_export_3: (a: number) => void;
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
