# (Anti) Koch Snowflake generator

This Rust program generates simple (Anti) Koch snowflakes from the commandline in the
[Netpbm format](https://en.wikipedia.org/wiki/Netpbm).

Mutiple examples of the output are laid out in atlas/texturemap form in the [atlas.png](atlas.png) file.

The program itself will generate a 3x3 atlas of the triangle from `n = 0` to `n = 8` (note
that the thickness of the line decreases at `n = 8` to make the fine details noticeable). Each tile 
holds both the standard triangle as well as its anti form.

## Table of Contents

- [Introduction](#introduction)
- [Features](#features)
- [Usage](#usage)
- [License](#license)

## Introduction

The [Koch Snowflake](https://en.wikipedia.org/wiki/Koch_snowflake) is a fractal named after Helge von Koch. It is formed by iteratively subdividing an equilateral triangle's sides into smaller equilateral triangles. This program provides a simple and customizable way to draw both verisons of it.

The AntiSnowflake is obtained by scaling the vector that points to the tip of the spikes by -1.

## Usage

1. **Clone:**

```bash
git clone https://github.com/amatgil/KochSnowflake
```

3. **Compile and run:**

The program takes no arguments, just run it normally:

```bash
cargo run --release && convert atlas.pbm atlas.png && gwenview atlas.png
```

This will save an appropriately named file with a `.pbm` extension, conver it into a png using`ImageMagick` and open it with `gwenview` (both programs must be installed for the commands to work).

## License

This project and all files contained therein and licensed under the [GNU GPLv3](https://www.gnu.org/licenses/gpl-3.0.txt) license (see [COPYING](COPYING) file).
