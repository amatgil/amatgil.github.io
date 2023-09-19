/* tslint:disable */
/* eslint-disable */
/**
*/
export enum Cell {
  Cap = 0,
  Cos = 1,
  Cua = 2,
  Llana = 3,
  Buit = 4,
}
/**
*/
export enum Direccio {
  Up = 0,
  Down = 1,
  Left = 2,
  Right = 3,
}
/**
*/
export class Graella {
  free(): void;
/**
* @returns {Graella}
*/
  static new(): Graella;
/**
* @param {number} dir
*/
  tick(dir: number): void;
/**
* @returns {number}
*/
  get_width(): number;
/**
* @returns {number}
*/
  get_height(): number;
/**
* @returns {number}
*/
  get_cells(): number;
/**
* @returns {string}
*/
  render(): string;
}
/**
*/
export class Posicio {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly __wbg_graella_free: (a: number) => void;
  readonly __wbg_posicio_free: (a: number) => void;
  readonly graella_new: () => number;
  readonly graella_tick: (a: number, b: number) => void;
  readonly graella_get_width: (a: number) => number;
  readonly graella_get_height: (a: number) => number;
  readonly graella_get_cells: (a: number) => number;
  readonly graella_render: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_free: (a: number, b: number, c: number) => void;
  readonly __wbindgen_exn_store: (a: number) => void;
  readonly __wbindgen_malloc: (a: number, b: number) => number;
  readonly __wbindgen_realloc: (a: number, b: number, c: number, d: number) => number;
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
