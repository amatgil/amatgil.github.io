import init from "/assets/wasm/altres/game_of_life/pkg/wasm_game_of_life.js";
import { Universe, Cell } from "/assets/wasm/altres/game_of_life/pkg/wasm_game_of_life.js";
import memory from "/assets/wasm/altres/game_of_life/pkg/wasm_game_of_life.js";

async function run_universe() {
	const wasm = await init();
	const universe = Universe.new();
	const canvas = document.getElementById("GoL-canvas");
	const ctx = canvas.getContext("2d");

	const universe_x_cells = universe.get_width();
	const universe_y_cells = universe.get_height();
	const mida_objectiu_graella = 875;

	const width_pantalla = window.screen.width;
	const ratio_de_display = 1;//(width_pantalla / 1920);
	const cell_size = (mida_objectiu_graella/universe_x_cells) * ratio_de_display;

	const line_width = 4;
	const alive_cell_color = "#ddddff";
	const line_color = "#181926";
	const generation_time_delay = 400;
	ctx.lineCap = "square";


	const space_taken_by_only_cells_x = universe_x_cells * cell_size;
	const space_taken_by_only_cells_y = universe_y_cells * cell_size;

	const canvas_width = universe_x_cells * cell_size;
	const canvas_height = universe_y_cells * cell_size;
	canvas.width = canvas_width;
	canvas.height = canvas_height;

	// Setup canvas
	for (let x = 0; x <= canvas_width; x++) {
		if (x % cell_size == 0) {
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;

			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas_height);
		}
	}
	for (let y = 0; y <= canvas_height; y++) {
		if (y % cell_size == 0) {
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;

			ctx.moveTo(0, y);
			ctx.lineTo(canvas_width, y);
		}
	}

	ctx.stroke();

	// Gaming
	while (true) {
		draw(universe, canvas, alive_cell_color, cell_size, wasm);
		universe.tick(); //TODO: remove when finished code
		await wait(generation_time_delay);
	}
	console.log(width_pantalla, cell_size, ratio_de_display);
}

async function draw(universe, canvas, alive_color, cell_size, wasm) {
	const ctx = canvas.getContext("2d");

	const cells_ptr = universe.get_cells();
	const universe_width = universe.get_width();
	const universe_height = universe.get_height();
	const universe_area = universe_width * universe_height;
	const cells = new Uint8Array(wasm.memory.buffer, cells_ptr, universe_area);

	// Les vives
	for (var i = 0; i <= universe_area; i++) {
		var [x, y] = idx_to_x_and_y(i, universe_width);
		var coords = transform_coordinates(x, y, cell_size);

		if (cells[i] == Cell.Alive) {
			ctx.fillStyle = alive_color;
			ctx.fillRect(coords[0], coords[1], cell_size, cell_size);
		}
	}

	// Les mortes
	for (var i = 0; i <= universe_area; i++) {
		var [x, y] = idx_to_x_and_y(i, universe_width);
		var coords = transform_coordinates(x, y, cell_size);

		if (cells[i] == Cell.Dead) {
			ctx.clearRect(coords[0], coords[1], cell_size, cell_size);
		}
	}

	// Dibuixa-ho tot
	ctx.stroke();
	console.log("Aquí teniu l'estat actual, en ASCII:", universe.render());
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

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

export {run_universe}
