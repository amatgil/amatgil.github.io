
import init from "/assets/wasm/altres/sim_gravetat/pkg/gravity_bevy.js";
import { run } from "/assets/wasm/altres/sim_gravetat/pkg/gravity_bevy.js";

async function load_gravity() {
	console.log("Initing");

	const wasm = await init();
	wasm.run();
	console.log("INITED");
}

async function place_gravity_in_div() {
	console.log("Moving");

	const canvas_div = document.getElementById('finestra-wasm');
	await sleep(600);
	console.log("Getting canvas");
	const canvases = document.getElementsByTagName('canvas');
	if (canvases.length == 0) {
		await sleep(100);
		place_gravity_in_div();
	}
	const canvas =  canvases[0];
	/*
		sleep(100);
		place_gravity_in_div();
	}
	*/
	console.log("the canvas is, ", canvas);
	canvas_div.appendChild(canvas);
}

function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

export { load_gravity, place_gravity_in_div };
