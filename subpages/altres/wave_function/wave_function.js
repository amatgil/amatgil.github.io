import init from "/assets/wasm/altres/wave_function/pkg/wave_function_collapse.js";
import { Board, Tile, Sides, Identif } from "/assets/wasm/altres/wave_function/pkg/wave_function_collapse.js";
import memory from "/assets/wasm/altres/wave_function/pkg/wave_function_collapse.js";


async function generar_visualitzacio() {
	const wasm = await init();

	const canvas = document.getElementById("Collapse-canvas");
	const ctx = canvas.getContext("2d");

	//const available_cells = get_available_cells();
	//console.log("Tiles are:");
	//console.log(available_cells);
	//console.log("Ptr are:");
	//const board_tiles_ptr = Board.get_future_tiles_ptr(8);
	//console.log(board_tiles_ptr);
	//const cells_from_ptr = new Uint8Array(wasm.memory.buffer, board_tiles_ptr, 8);
	//console.log("Cells are:");
	//console.log(cells_from_ptr);

	const board = Board.generate();
	console.log("Board is:");
	console.log(board);

	const board_x_tiles = board.get_length();
	const board_y_tiles = board.get_length();
	const mida_objectiu_graella = 1050;
	const tile_size = mida_objectiu_graella / board_x_tiles;


	const tiles_size = mida_objectiu_graella / board_x_tiles;
	//const line_width = Math.max(Math.floor(-input.value / 200) + 3, 0);
	const line_width = 3;
	console.log("Width: ", line_width);
	const alive_cell_color = "#00ffff";
	const centre_color = "#ff00f0";
	const line_color = "#181926";
	ctx.lineCap = "square";

	const canvas_width = board_x_tiles * tile_size;
	const canvas_height = board_y_tiles * tile_size;

	canvas.width = canvas_width;
	canvas.height = canvas_height;

	// Setup canvas
	ctx.lineWidth = line_width;
	ctx.strokeStyle = line_color;
	for (let x = 0; x <= canvas_width; x += tile_size) {
		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas_height);
	}

	for (let y = 0; y <= canvas_height; y += tile_size) {
		ctx.moveTo(0, y);
		ctx.lineTo(canvas_width, y);
	}

	ctx.stroke();

	// La part xula
	draw(board, canvas, wasm, tile_size);
}

async function draw(board, canvas, wasm, tile_size) {
	const ctx = canvas.getContext("2d");

	const board_length = board.get_length();
	const board_area = board_length * board_length;
	const tiles = new Uint8Array(wasm.memory.buffer, board.get_tiles_chars_ptr(), board_area);



	console.log("Dibuixant...");
	//console.log(tiles);
	console.log(board.render());
	console.log("The usable tiles are: ", board.render_usable_tiles());
	console.log(tiles);

	for (var i = 0; i <= board_area; i++) {
		var [x, y] = idx_to_x_and_y(i, board_length);
		var coords = transform_coordinates(x, y, tile_size);

		//ctx.font = "10px Arial";
		console.log("Tiles_char is ", tiles[i]);
		const t_cols = char_to_color(tiles[i].texture);
		draw_square_from_edge_colors(ctx, coords, tile_size,
			t_cols[0], t_cols[1], t_cols[2], t_cols[3]);
	}


	// Dibuixa-ho tot
	ctx.stroke();
	//console.log("Aquí teniu l'estat actual, en ASCII:", grid.render());
	draw_square_from_edge_colors(ctx, [0, 0], tile_size, "#ff0000", "#00ff00", "#0000ff", "#00ffff");
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

function draw_square_from_edge_colors(ctx, coords, tile_size, east_col, north_col, west_col, south_col) {
	const half_size = tile_size / 2;
	const center = [coords[0] + half_size, coords[1] + half_size];
	// a --- b
	// |     | 
	// |  o  |
	// |     |
	// c --- d
	const a = coords;
	const b = [coords[0] + tile_size, coords[1]];
	const c = [coords[0], coords[1] + tile_size];
	const d = [coords[0] + tile_size, coords[1] + tile_size];

	// East 
	ctx.beginPath();
	ctx.fillStyle = east_col;
    ctx.moveTo(d[0], d[1]);
    ctx.lineTo(b[0], b[1]);
    ctx.lineTo(center[0], center[1]);
	ctx.closePath();
    ctx.fill();

	// North 
	ctx.beginPath();
	ctx.fillStyle = north_col;
    ctx.moveTo(b[0], b[1]);
    ctx.lineTo(a[0], a[1]);
    ctx.lineTo(center[0], center[1]);
	ctx.closePath();
    ctx.fill();
	
	// West 
	ctx.beginPath();
	ctx.fillStyle = west_col;
    ctx.moveTo(a[0], a[1]);
    ctx.lineTo(c[0], c[1]);
    ctx.lineTo(center[0], center[1]);
	ctx.closePath();
    ctx.fill();

	// South
	ctx.beginPath();
	ctx.fillStyle = south_col;
    ctx.moveTo(c[0], c[1]);
    ctx.lineTo(d[0], d[1]);
    ctx.lineTo(center[0], center[1]);
	ctx.closePath();
    ctx.fill();
}

function char_to_color(c) {
	const b = "#ffffff";
	const w = "#000000";
	if (c == '┐')      { return [b, b, w, w]; }
	else if (c == '┘') { return [b, w, w, b]; }
	else if (c == '┌') { return [w, b, b, w]; }
	else if (c == '└') { return [w, w, b, b]; }
	else if (c == '┤') { return [b, w, w, w]; }
	else if (c == '┬') { return [w, b, w, w]; }
	else if (c == '├') { return [w, w, b, w]; }
	else if (c == '┴') { return [w, w, w, b]; }
	else if (c == ' ') { return [b, b, b, b]; }
	else {
		console.log("ERROR: AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA", c);
		console.log("c is", c);
	}
}

export { generar_visualitzacio }
