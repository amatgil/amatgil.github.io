function loadCSVFile(filename) {
	var xhr = new XMLHttpRequest();
	var result;
	xhr.onreadystatechange = function() {
		if (xhr.readyState === XMLHttpRequest.DONE) {
			if (xhr.status === 200) {
				var csvData = xhr.responseText;
				var parsedData = parseCSV(csvData);
				result = parsedData;
			} else {
				console.error('Failed to load file: ' + filename);
			}
		}
	};
	xhr.open('GET', filename, false);
	xhr.send();
	return result;
}

function parseCSV(csvData) {
  var lines = csvData.split('\n');
  var result = [];
  var headers = lines[0].split(',');
  for (var i = 1; i < lines.length; i++) {
    var obj = {};
    var currentLine = lines[i].split(',');
    for (var j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }
    result.push(obj);
  }
  return result;
}

var csv = loadCSVFile("/assets/other/irregulars/default.csv");
var curr_idx = -1;

function UpdateChallenge() {
	//curr_idx = Math.floor(Math.random() * (csv.length - 1)); // Minus one because unavoidable newline at EOF
	curr_idx = (curr_idx + 1) % (csv.length - 1);
	console.log(curr_idx);
	const enunciat_div = document.getElementById("irreg-enunciat");
	enunciat_div.innerHTML = csv[curr_idx].Orig + ":";

	document.getElementById("input-c").onkeypress = function(e) {
		if (!e) e = window.event;
		var keyCode = e.code || e.key;
		if (keyCode == 'Enter'){
			CheckAnswer();
			UpdateChallenge();
		}
	}
}


function CheckAnswer() {
	const a_div = document.getElementById("input-a");
	const b_div = document.getElementById("input-b");
	const c_div = document.getElementById("input-c");

	const a_resposta = document.getElementById("irreg-res-a");
	const b_resposta = document.getElementById("irreg-res-b");
	const c_resposta = document.getElementById("irreg-res-c");

	// Check
	if (a_div.value.toLowerCase() == csv[curr_idx].Inf.toLowerCase()) {
		a_resposta.style.color= "LimeGreen";
		a_resposta.innerHTML = "Correcte (" + csv[curr_idx].Inf + ")";
	} else {
		a_resposta.style.color = "Orchid";
		a_resposta.innerHTML = "Incorrecte (era " + csv[curr_idx].Inf + ")";
	}

	if (b_div.value.toLowerCase() == csv[curr_idx].Pret.toLowerCase()) {
		b_resposta.style.color= "LimeGreen";
		b_resposta.innerHTML = "Correcte (" + csv[curr_idx].Pret + ")";
	} else {
		b_resposta.style.color = "Orchid";
		b_resposta.innerHTML = "Incorrecte (era " + csv[curr_idx].Pret + ")";
	}

	if (c_div.value.toLowerCase() == csv[curr_idx].Part.toLowerCase()) {
		c_resposta.style.color= "LimeGreen";
		c_resposta.innerHTML = "Correcte (" + csv[curr_idx].Part + ")";
	} else {
		c_resposta.style.color = "Orchid";
		c_resposta.innerHTML = "Incorrecte (era " + csv[curr_idx].Part + ")";
	}
	a_div.value = "";
	b_div.value = "";
	c_div.value = "";
	a_div.focus();
}

