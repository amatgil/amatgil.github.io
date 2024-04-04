# Simulador SISA

The code is incredibly self documenting (on purpose). Usage is below.

Options and flags can be shown by running the `-h` (summary) or `--help` (full) flags.

## Usage
To solve the alien that I had for 13c (which gave instuctions and initial memory, with an initial
PC of 0 and no initial register state), use (Note the use of `--simple`): 

```rs
cargo run -- --simple examples/alien/alien.sisa -m examples/alien/alien.smem -i examples/alien/alien.sio 
```

To solve the alien that I had for Tema 14  (Note the lack of `--simple`):
```rs
cargo run -- examples/complete/first_example.sisa
```

You may also specify some initial values for the registers and IO, regardless of if the 
input is `--simple` or not:

```rs
cargo run -- [code file] -r [registers file] -i [io file]
```

## IO
Use `[cpu].update_io(new_io)` to change the IO status in between `execute`s. This cannot be done
from the cli, at the moment, because I have no idea how (and it doesn't seem that useful, to be 
honest).

## Registers
File must contain eight lines (or less, for a computer with less registers), each with a decimal number. E.g.
```txt
0
0
0
0
0
0
5
17
```

Register `6` will hold `0x0005` and Register `7` will hold `0x0011`.

You cannot use more than eight registers, it will abort (this is intended behavior).


## Ideas
- Use `as` more (note the sign extension remarks when upcasting): https://doc.rust-lang.org/reference/expressions/operator-expr.html#type-cast-expressions


# Notes
- .text and .data are not followed by `:`, only labels are
- Don't `.set` words like verbs, register names or labels. That's UB.
- Don't mismatch parens. That's UB, though I try to catch them
- Jumps are always relative, so JALR may behave... unexpectedly (wrong). Careful!
- Don't try to make jumps too large. There's a check for this but it's untested
- Don't feed it malformed input like `MOVI R5, 0x555`.If you feed it invalid input, you're gonna get UB (good luck 
    lmao), though I do try to catch them when I can.
- The memory and data memories are separate because I didn't stop to think before I started 
    writing down code. Just, like, assume they're the same. I'm protecting you from yourself (this actually
    has already helped me from programmer error lmao).
- The LD/ST instructions have offsets in their command: these are always in number of bytes,
    not words (changing it would be easy, the source code is actually very readable and intuitive).
- If the program were to not halt, the output would grow VERY large, so there's a built in check: if the number of
    instructions ran exceeds 10000 (`MAX_INSTRUCTION_RUN_SIZE`), it halts execution.

# License
Licensed under the [GPLv3](https://www.gnu.org/licenses/gpl-3.0.en.html) (see COPYING file for full text).
