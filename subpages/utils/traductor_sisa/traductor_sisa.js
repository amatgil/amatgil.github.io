import init from "/assets/wasm/utils/traductor_sisa/pkg/traductor_SISA.js";
import { translate_instruction } from "/assets/wasm/utils/traductor_sisa/pkg/traductor_SISA.js";


export function initialitza_entrada() {
    document.getElementById("entrada-sisa-value").value = "ADD R1, R2, R3";
}

export async function translate() {
	const wasm = await init();
	const res = document.getElementById('resultat');
	let o1    = document.querySelector('input[name="a_addr_pos"]:checked').value;
	let o2    = document.querySelector('input[name="b_addr_pos"]:checked').value;
	let o3    = document.querySelector('input[name="d_addr_pos"]:checked').value;
	let o4    = document.querySelector('input[name="rbn_pos"]:checked').value;
	let o5    = document.querySelector('input[name="op_pos"]:checked').value;
	let o6    = document.querySelector('input[name="f_pos"]:checked').value;
	let o7    = document.querySelector('input[name="in_alu_pos"]:checked').value;
	let o8    = document.querySelector('input[name="wrd_pos"]:checked').value;

	let in_string = document.getElementById("entrada-sisa-value");
	let result = await translate_instruction(in_string.value, o1, o2, o3, o4, o5, o6, o7, o8);
	console.log(o1, o2, o3, o4, o5, o6, o7, o8);
	console.log(in_string.value);
	console.log(result);
	res.innerHTML = result
}
