/*
function generar_taula() {
	alert("AAAAAAAAAAAAAAAA");
}

*/


 import init, { crear_taula } from "/assets/wasm/logica_formal/pkg/logica_per_wasm_backend.js"; 

async function generar_taula() {
	await init();
	let entrada_elem = document.getElementById("entrada-logica-formal");
	let entrada = entrada_elem.innerHTML;

	let sortida_elem = document.getElementById("sortida-logica-formal");
	let sortida = crear_taula(entrada);

	sortida_elem.innerHTML = sortida;
	console.log(sortida);
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
