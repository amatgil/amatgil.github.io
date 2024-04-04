/* tslint:disable */
/* eslint-disable */
/**
*/
export class MemAddr {
  free(): void;
/**
*/
  0: number;
}
/**
* The held memory that is contained in the [Processador]'s MEMORY module, stored as bytes (not
* words). 
*/
export class Memory {
  free(): void;
}
/**
*/
export class NumInstruccions {
  free(): void;
}
/**
* The main Processor type. This contains the entire state of the simulator at any given time 
* and implements all the functionality that is given.
*
* Note that the instruction memory only holds its values at the even addresses and that the
* [PC](ProgCounter)
* increments by 2 on each one.
*/
export class Processador {
  free(): void;
/**
* Maximum allowed number of instructions to be run, to avoid generating infinite output wrt
* non-halting programs
* It's not a constant because wasm_bindgen doesn't like associated constant
* @returns {number}
*/
  static max_instruction_run_size(): number;
/**
* Create a new Processador given a starting state
* @param {string} init_regs
* @param {string} init_mem
* @param {string} init_pc
* @param {string} instructions
* @param {string} init_io
* @returns {Processador}
*/
  static new(init_regs: string, init_mem: string, init_pc: string, instructions: string, init_io: string): Processador;
/**
* Execute the next instruction, which is the one that the Program  Counter is currently
* pointing to. If there is no instruction at that address, the program gracefully exits.
*
* Returns true if it executed it, false if there was no instruction at the PC
* @returns {boolean}
*/
  execute_next(): boolean;
/**
* Display the values of the current memory, separated by newlines
* @returns {string}
*/
  current_memory(): string;
/**
* Display the values of the current registers, separated by newlines
* @returns {string}
*/
  current_regs(): string;
/**
* Display the values outputted by "OUT" instructions over the course of the execution
* @returns {string}
*/
  current_outted(): string;
/**
* @returns {string}
*/
  current_pc(): string;
/**
* Tuple of usizes: FAST and SLOW instructions executed
* @returns {Uint32Array}
*/
  curr_fast_and_slow(): Uint32Array;
}
/**
* The program counter, which hold the address of the next instruction to execute. It is
* incremented by 2 on every instruction, and may be altered by special branching instructions.
*/
export class ProgCounter {
  free(): void;
/**
*/
  0: number;
}
/**
* The sequence of eight registers that are contained in the [Processador]'s REGFILE.
*/
export class Registers {
  free(): void;
}

export type InitInput = RequestInfo | URL | Response | BufferSource | WebAssembly.Module;

export interface InitOutput {
  readonly memory: WebAssembly.Memory;
  readonly processador_max_instruction_run_size: () => number;
  readonly processador_new: (a: number, b: number, c: number, d: number, e: number, f: number, g: number, h: number, i: number, j: number, k: number) => void;
  readonly processador_execute_next: (a: number) => number;
  readonly processador_current_memory: (a: number, b: number) => void;
  readonly processador_current_regs: (a: number, b: number) => void;
  readonly processador_current_outted: (a: number, b: number) => void;
  readonly processador_current_pc: (a: number, b: number) => void;
  readonly processador_curr_fast_and_slow: (a: number, b: number) => void;
  readonly __wbg_registers_free: (a: number) => void;
  readonly __wbg_memory_free: (a: number) => void;
  readonly __wbg_processador_free: (a: number) => void;
  readonly __wbg_numinstruccions_free: (a: number) => void;
  readonly __wbg_memaddr_free: (a: number) => void;
  readonly __wbg_get_memaddr_0: (a: number) => number;
  readonly __wbg_set_memaddr_0: (a: number, b: number) => void;
  readonly __wbg_get_progcounter_0: (a: number) => number;
  readonly __wbg_progcounter_free: (a: number) => void;
  readonly __wbg_set_progcounter_0: (a: number, b: number) => void;
  readonly __wbindgen_add_to_stack_pointer: (a: number) => number;
  readonly __wbindgen_export_0: (a: number, b: number) => number;
  readonly __wbindgen_export_1: (a: number, b: number, c: number, d: number) => number;
  readonly __wbindgen_export_2: (a: number, b: number, c: number) => void;
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
