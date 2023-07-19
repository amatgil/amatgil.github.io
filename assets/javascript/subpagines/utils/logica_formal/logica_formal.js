/*
function generar_taula() {
	alert("AAAAAAAAAAAAAAAA");
}

*/


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


/*export { crear_taula };*/

/*
const generarTaula = async () => {
  // Instantiate our wasm module
  const generarTaula = await wasmInit("/assets/wasm/logica_formal/pkg/logica_per_wasm_backend_bg.wasm");

  // Run the exported function
  rustWasm.generar_taula(); // Should log "This console.log is from wasm!"
};
*/
