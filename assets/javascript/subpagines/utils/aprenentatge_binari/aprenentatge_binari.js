const MAX_EXP = 12;

window.addEventListener('load', function () {
	memoritzador_binari();
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
