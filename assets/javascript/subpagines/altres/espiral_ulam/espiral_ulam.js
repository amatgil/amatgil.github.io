import init from "/assets/wasm/altres/espiral_ulam/pkg/espiral_ulam.js";
import { Grid, Cell } from "/assets/wasm/altres/espiral_ulam/pkg/espiral_ulam.js";
import memory from "/assets/wasm/altres/espiral_ulam/pkg/espiral_ulam.js";


async function generar_visualitzacio() {
	const wasm = await init();

	const input = document.getElementById("Ulam-Input-Range");

	console.log("Generant amb input: ", input.value);

	const grid = Grid.new(input.value);
	const canvas = document.getElementById("Ulam-canvas");
	const ctx = canvas.getContext("2d");

	const grid_x_cells = grid.get_width();
	const grid_y_cells = grid.get_height();
	const mida_objectiu_graella = 1050;


	const cell_size = mida_objectiu_graella / grid_x_cells;
	/* const line_width = 3; */
	const line_width = Math.min(Math.floor(-input.value / 200) + 3, 0);
	console.log("Width: ", line_width);
	const alive_cell_color = "#00ffff";
	const centre_color = "#ff00f0";
	const line_color = "#181926";
	ctx.lineCap = "square";

	const canvas_width = grid_x_cells * cell_size;
	const canvas_height = grid_y_cells * cell_size;

	canvas.width = canvas_width;
	canvas.height = canvas_height;

	// Setup canvas
	ctx.lineWidth = line_width;
	ctx.strokeStyle = line_color;
	for (let x = 0; x <= canvas_width; x += cell_size) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas_height);
	}

	for (let y = 0; y <= canvas_height; y += cell_size) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas_width, y);
	}

	ctx.stroke();

	// La part xula
	draw(grid, canvas, alive_cell_color, centre_color, cell_size, wasm);
}

async function draw(grid, canvas, alive_color, centre_color, cell_size, wasm) {
	const ctx = canvas.getContext("2d");

	const cells_ptr = grid.get_cells();
	const grid_width = grid.get_width();
	const grid_height = grid.get_height();
	const grid_area = grid_width * grid_height;
	const cells = new Uint8Array(wasm.memory.buffer, cells_ptr, grid_area);

	console.log("Dibuixant...");

	// Les no-vives
	for (var i = 0; i <= grid_area; i++) {
		var [x, y] = idx_to_x_and_y(i, grid_width);
		var coords = transform_coordinates(x, y, cell_size);

		if (cells[i] == Cell.Primer) {
			ctx.fillStyle = alive_color;
			ctx.fillRect(coords[0], coords[1], cell_size, cell_size);

		} else if (cells[i] == Cell.Centre) {
			ctx.fillStyle = centre_color;
			ctx.fillRect(coords[0], coords[1], cell_size, cell_size);
		}
	}


	// Dibuixa-ho tot
	ctx.stroke();
	//console.log("Aquí teniu l'estat actual, en ASCII:", grid.render());
}

function transform_coordinates(x, y, cell_size) {
	const out_x = x * cell_size;
	const out_y = y * cell_size;

	return [out_x, out_y];
}

function idx_to_x_and_y(idx, width) {
	var x = idx % width;
	var y = Math.floor(idx / width);
	return [x, y];
}


export { generar_visualitzacio }
