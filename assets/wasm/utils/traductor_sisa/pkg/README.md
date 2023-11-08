# Traductor SISA per a classe de IC

## Example
```txt
> ADD R4 R1 R2
Control word is:
@A-@B-ROPF--I@D-WN---
00101010010001001XXXX
Desglossat:
- @A: 001
- @B: 010
- Rb/N: 1
- op: 00
- f: 100
- in_alu: 0
- d_addr: 100
- wr_d: 1
- n:XXXX
```
## Spec
- Instructions are `"NAME DATA1, DATA2, DATA3"` (note the space after the commas. The commas are optional, the spaces are mandatory)
- Most operations are binary operations, taking in (possible) destination and (always) two input values. They may not. If not enough are provided, the program panics (unwinds the stack and exits).
- If the instruction ends in `I` (e.g. `ADDI`), the second data value is immediate (comes from `n`), not from a REG. This immediate value should be (as of now) in decimal, not hex, and be preceded by `0x`.

- NOTE: `n` will be read in as hex and must be of the format `0xdddd`, where `d` are hex digits.
- NOTE: Input is assumed to be valid and clean and will be parsed regardless of any mistakes. If there is a value missing, it will panic
- NOTE: Negative numbers are untested and likely to not work

## Output
The output is a series of 33 bits following the following specification:
- 3 bits for A's address
- 3 bits for B's address
- 1 bit for Rb/N
- 2 bits for OP
- 3 bits for F
- 1 bit for In/ALU
- 1 bit for D's address
- 1 bit for WrD
- 16 bits for N


