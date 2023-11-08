const MAX_EXP = 12;

window.addEventListener('load', function () {
	const opcio_triada = document.getElementById("opcions_memoritzador_basic");
	const div_binari_div = document.getElementById("memoritzador_binari");
	const hex_to_bin_div = document.getElementById("hex_a_bin_practica");
	const bin_to_hex_div = document.getElementById("bin_a_hex_practica");

	div_binari_div.style.display = 'none';
	hex_to_bin_div.style.display = 'none';
	bin_to_hex_div.style.display = 'none';

	opcio_triada.onchange = function () {
		div_binari_div.style.display = 'none';
		hex_to_bin_div.style.display = 'none';
		bin_to_hex_div.style.display = 'none';

		switch (opcio_triada.value) {
			case 'Potencies_binaries':
				console.log("Practic. pots");
				div_binari_div.style.display = 'inline';
				memoritzador_binari();
				break;
			case 'Hex_to_Bin':
				console.log("h-b");
				hex_to_bin_div.style.display = 'inline';
				transformador_hb();
				break;
			case 'Bin_to_Hex':
				console.log("b-h");
				bin_to_hex_div.style.display = 'inline';
				transformador_bh();
				break;
		}
	};
})

function memoritzador_binari() {
	const entrada = document.getElementById("potencia_resposta");
	const sortida = document.getElementById("resultat");
	const exp_elem = document.getElementById("exponent");
	console.log("e", entrada);
	console.log("exp", exp_elem);

	var exponent = 2; 
	entrada.addEventListener("keyup", ({key}) => {
		if (key === "Enter") {
			// Comprova resposta i canvia la pregunta
			console.log("Rebut: ", entrada.value);
			if (entrada.value == 2 ** exponent) {
				sortida.innerHTML = 'Correcte! 2\^(' + exponent + ') = ' + 2**exponent;
				sortida.style.color = "#048A47";

				exponent = getRandomInt(MAX_EXP);
				exp_elem.innerHTML = exponent;

			} else {
				sortida.innerHTML = "Incorrecte";
				sortida.style.color = "#DA6573"
			}
			entrada.value = null;
		}
	})
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function transformador_bh() {
	const entrada = document.getElementById("entrada_b-h");
	const sortida_oct = document.getElementById("octal_res_bh");
	const sortida_dec = document.getElementById("dec_res_bh");
	const sortida_hex = document.getElementById("hex_res_bh");

	entrada.addEventListener("keyup", ({key}) => {
		console.log(entrada.value);
		console.log(parseInt(entrada.value, 2));
		var val = parseInt(entrada.value, 2);
		sortida_oct.innerHTML = val.toString(8);
		sortida_dec.innerHTML = val.toString(10).toUpperCase();
		sortida_hex.innerHTML = val.toString(16).toUpperCase();
	})
}
function transformador_hb() {
	const entrada = document.getElementById("entrada_h-b");
	const sortida_bin = document.getElementById("bin_res_hb");
	const sortida_oct = document.getElementById("octal_res_hb");
	const sortida_dec = document.getElementById("dec_res_hb");

	entrada.addEventListener("keyup", ({key}) => {
		console.log(entrada.value);
		var val = parseInt(entrada.value, 16);
		console.log(val);
		sortida_bin.innerHTML = val.toString(2).toUpperCase();
		sortida_oct.innerHTML = val.toString(8);
		sortida_dec.innerHTML = val.toString(10).toUpperCase();
	})
}
