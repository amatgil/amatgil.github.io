import init, { crear_taula } from "/assets/wasm/logica_formal/pkg/logica_per_wasm_backend.js"; 

async function generar_taula() {
	console.log("Començant calculs...");
	await init();
	let entrada = document.getElementById("entrada-logica-formal").value;
	console.log(entrada);

	let sortida_elem = document.getElementById("sortida-logica-formal");
	let sortida = crear_taula(entrada);
	console.log(sortida_elem);
	console.log(sortida);

	sortida_elem.innerHTML = sortida;
}

export default generar_taula;

