import init from "/assets/wasm/altres/snake/pkg/snake.js";
import { Graella, Cell, Direccio } from "/assets/wasm/altres/snake/pkg/snake.js";
import memory from "/assets/wasm/altres/snake/pkg/snake.js";

async function run_graella() {
	const wasm = await init();
	const graella = Graella.new();
	const canvas = document.getElementById("snake-canvas");
	const ctx = canvas.getContext("2d");

	const graella_x_cells = graella.get_width();
	const graella_y_cells = graella.get_height();
	const mida_objectiu_graella = 875;

	const width_pantalla = window.screen.width;
	const cell_size = mida_objectiu_graella / graella_x_cells;

	const line_width = 3;
	const cap_color = "#ff0000";
	const cua_color = "#00ff00";
	const cos_color = "#0000ff";
	const llana_color = "#ff00ff";
	const buit_color = "#000000";

	const line_color = "#181926";
	const generation_time_delay = 200;
	ctx.lineCap = "square";


	const canvas_width = graella_x_cells * cell_size;
	const canvas_height = graella_y_cells * cell_size;
	canvas.width = canvas_width;
	canvas.height = canvas_height;

	// Setup canvas
	for (let x = 0; x <= canvas_width; x += cell_size) {
		ctx.lineWidth = line_width;
		ctx.strokeStyle = line_color;

		ctx.moveTo(x, 0);
		ctx.lineTo(x, canvas_height);
	}
	for (let y = 0; y <= canvas_height; y += cell_size) {
		ctx.lineWidth = line_width;
		ctx.strokeStyle = line_color;

		ctx.moveTo(0, y);
		ctx.lineTo(canvas_width, y);
	}

	ctx.stroke();

	// Gaming
	graella.tick(Direccio.Up);
	var dir;
	while (true) {
		draw(graella, canvas, cap_color, cua_color, cos_color, llana_color, buit_color, cell_size, wasm);
		document.addEventListener('keydown', function(event) {
			event.preventDefault();
			if(event.key == "ArrowUp") {
				dir = Direccio.Up;
			} else if (event.key == "ArrowDown") {
				dir = Direccio.Down;
			}else if (event.key == "ArrowLeft") {
				dir = Direccio.Left;
			}else if (event.key == "ArrowRight") {
				dir = Direccio.Right;
			}
		});
		graella.tick(dir);
		await wait(generation_time_delay);
	}
	console.log(width_pantalla, cell_size, ratio_de_display);
}

async function draw(graella, canvas,
	cap_color, cua_color, cos_color, llana_color, buit_color,cell_size, wasm)
{
	const ctx = canvas.getContext("2d");

	const cells_ptr = graella.get_cells();
	const graella_width = graella.get_width();
	const graella_height = graella.get_height();
	const graella_area = graella_width * graella_height;
	const cells = new Uint8Array(wasm.memory.buffer, cells_ptr, graella_area);

	// Les vives
	for (var i = 0; i <= graella_area; i++) {
		var [x, y] = idx_to_x_and_y(i, graella_width);
		var coords = transform_coordinates(x, y, cell_size);

		if (cells[i] == Cell.Cap) {
			ctx.fillStyle = cap_color;
		} else if (cells[i] == Cell.Cos) {
			ctx.fillStyle = cos_color;
		} else if (cells[i] == Cell.Cua) {
			ctx.fillStyle = cua_color;
		} else if (cells[i] == Cell.Llana) {
			ctx.fillStyle = llana_color;
		}

		ctx.fillRect(coords[0], coords[1], cell_size, cell_size);
	}

	// Les mortes
	for (var i = 0; i <= graella_area; i++) {
		var [x, y] = idx_to_x_and_y(i, graella_width);
		var coords = transform_coordinates(x, y, cell_size);

		if (cells[i] == Cell.Buit) {
			ctx.clearRect(coords[0], coords[1], cell_size, cell_size);
		}
	}

	// Dibuixa-ho tot
	ctx.stroke();
	console.log("Aquí teniu l'estat actual, en ASCII:", graella.render());
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

export {run_graella}
