function calcular_nota() {
	console.log("'Calcular' ha estat clickat");
	let batx = document.querySelector('#batx').value;
	let catala = document.querySelector('#catala').value;
	let castella = document.querySelector('#castella').value;
	let angles = document.querySelector('#angles').value;
	let historia = document.querySelector('#historia').value;
	let comuna = document.querySelector('#comuna').value;
	const generals = [catala, castella, angles, historia, comuna];

	let final_general = 0.0;
	for (let i = 0; i < 5; i++) {
		final_general += Number(generals[i]);
	}
	final_general /= 5;

	let esp1 = document.querySelector('#especifica-1').value;
	let esp2 = document.querySelector('#especifica-2').value;

	let pond1 = document.getElementById('ponderacio-1').value / 10;
	let pond2 = document.getElementById('ponderacio-2').value / 10;

	const especifiques = [esp1 * pond1, esp2 * pond2];
	let final_especifica = especifiques[0] + especifiques[1];

	let resultat = batx * 0.6 + final_general * 0.4 + final_especifica;

	document.getElementById('resultat').innerHTML = resultat;

	console.log("Nota batx: " + batx);
	console.log("Nota general: " + final_general);
	console.log("Suma especifiques: " + final_especifica);
	console.log("Resultat final: " + resultat);
}
