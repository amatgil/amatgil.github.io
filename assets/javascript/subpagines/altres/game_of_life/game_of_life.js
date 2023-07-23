import init, { Universe, Cell } from "/assets/wasm/altres/game_of_life/pkg/wasm_game_of_life.js";
import memory from "/assets/wasm/altres/game_of_life/pkg/wasm_game_of_life.js";

async function run_universe() {
	await init();
	const universe = Universe.new();
	const canvas = document.getElementById("GoL-canvas");
	const ctx = canvas.getContext("2d");

	const universe_x_cells = universe.get_width();
	const universe_y_cells = universe.get_height();
	const cell_size = 25;
	const line_width = 4;
	const alive_cell_color = "#ffffff";
	const line_color = "#181926";
	const generation_time_delay = 400;
	ctx.lineCap = "square";

	const space_taken_by_only_cells_x = universe_x_cells * cell_size;
	const space_taken_by_only_cells_y = universe_y_cells * cell_size;

	const padding = line_width;

	const canvas_width = universe_x_cells * cell_size + padding * universe_x_cells;
	const canvas_height = universe_y_cells * cell_size + padding * universe_y_cells;
	canvas.width = canvas_width;
	canvas.height = canvas_height;

	// Setup canvas
	for (let x = 0; x <= canvas_width + padding * 4; x++) {
		if (x % (cell_size + padding) == 0) {
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;

			ctx.moveTo(x, 0);
			ctx.lineTo(x, canvas_height);
			ctx.stroke();
		}
	}
	for (let y = 0; y <= canvas_height + padding * 4; y++) {
		if (y % (cell_size + padding) == 0) {
			ctx.lineWidth = line_width;
			ctx.strokeStyle = line_color;

			ctx.moveTo(0, y);
			ctx.lineTo(canvas_width, y);
			ctx.stroke();
		}
	}

	while (true) {

		universe.tick();
		draw(universe, canvas, alive_cell_color, cell_size, padding);
		await wait(generation_time_delay);
	}
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}

function draw(universe, canvas, alive_color, cell_size, padding) {
	const ctx = canvas.getContext("2d");

	const cells_ptr = universe.get_cells();
	const universe_width = universe.get_width();
	const universe_height = universe.get_height();
	const cells = new Uint8Array(memory.buffer, cells_ptr, universe_width * universe_height);

	console.log("info:");

	console.log(cells);
	for (var i = 0; i < universe_width * universe_height; i++) {
		var [row, col] = idx_to_row_and_col(i, universe_width, universe_height);
		var coords = transform_coordinates(row, col, cell_size, padding);
		//console.log(coords);
		if (cells[i] == Cell.Alive) {
			ctx.fillStyle = alive_color;
			ctx.fillRect(coords[0], coords[1], cell_size + padding, cell_size + padding);
			ctx.stroke();
		}
	}








}

function transform_coordinates(x, y, cell_size, padding) {
	const out_x = x * cell_size + padding / 2;
	const out_y = y * cell_size + padding / 2;

	return [out_x, out_y];

}

function idx_to_row_and_col(idx, width, height) {
	var row = idx / width;
	var col = idx % width;
	return [row, col];
}

export {run_universe}
