

/* `presets` és un mapa tal que la clau és el nom de l'assignatura (l'string que apareixerà
 * al dropdown) i el valor és un array de dos elements:
 * - els noms de cada acta evaluable (`NOMSACTES`)
 * - un array que conté sub-arrays de la mateixa mida que `NOMSACTES`. Cada subarray representa un possible
 *   camí per aconseguir la nota. Al calcular-se, es farà el màxim de tots (post-càlcul)
 * 
 * Recordeu que les ponderacions son sobre 100, no sobre 1!!
 * Exemple:
 * ```
 *  "XC": [
 *      ["Mitjana Controls Lab", "Examen Final Lab", "Control 1", "Final"],
 *      [[15,                     15,                 21,          49],
 *      [ 15,                     15,                 0,           70]]
 *  ],
 * ```
 */
const presets = {
    "IDI": [
        ["Prova Lab", "Prova Teoria 1", "Prova Teoria 2"],
        [[25,          25,               50]]
    ],
    "AC": [
        ["Control 1",  "Control 2",  "Lab",  "AP"], 
        [[30,           40,           20,     10]]
    ],
    "EEE": [
        ["PEC 1",  "PEC 2",  "PEC 3",  "PEC 4",  "PEC 5",  "PEC 6"],
        [[100/6,    100/6,    100/6,     100/6,   100/6,    100/6]]
    ],
    "IES": [
        ["FHC 1",  "Control 1",  "FHC 2",  "Participació" ],
        [[40,       15,           40,       5]]
    ],
    // Final = 30*Lab + 70*Teoria
    //     Lab = 50*MiniControlsLab + 50*Examen Final Lab
    //     Teoria = 30*max(Control1, Final) + 70*Final
    // Final = 30*(50*MiniControlLab + 50*EFLab) +
    //         + 70*(30*max(Control1, Final) + 70*Final)
    // FinalA = 0.15*MiniControlLab + 0.15*FinalLab + + 0.21Control1 + 0.49*Final
    // FinalB = 0.15*MiniControlLab + 0.15*FinalLab + 0.7*Final
    "XC": [
        ["Mitjana Controls Lab", "Examen Final Lab", "Control 1", "Final"],
        [[15,                     15,                 21,          49],
        [ 15,                     15,                 0,           70]]
    ],
};

function popula_presets() {
    const select = document.getElementById('preset-select');
    for (const preset of Object.entries(presets)) {
        const nomAssig = preset[0];
        const info = preset[1];
        const nomsParts = info[0];
        const valorsParts = info[1];

        const option = new Option(nomAssig, nomAssig);
        select.add(option);
    }
    const res = document.getElementById('resultat-final');
    res.textContent = "<No Info>";
}

document.addEventListener('DOMContentLoaded', popula_presets, false);

function update_boxes_in_valors() {
    const volem = document.getElementById("preset-select").value;
    if (volem == "") return;

    // Borrem el temari anterior
    const valors = document.getElementById('container-valors');
    valors.replaceChildren();

    const [nomsElements, ponderacions] = presets[volem];

    for (var i = 0; i < nomsElements.length; ++i) {
        var newDivText = document.createElement("p");
        newDivText.classList.add("entrada-valor-text");
        newDivText.textContent = nomsElements[i];
        newDivText.style.gridRowStart = i.toString();
        newDivText.style.gridRowEnd = (i+1).toString();
        newDivText.style.gridColumnStart = "0";
        newDivText.style.gridColumnEnd = "1";

        var newDivPondOp = document.createElement("input");
        newDivPondOp.style.gridColumnStart = "1";
        newDivPondOp.style.gridColumnEnd = "2";
        newDivPondOp.type = "number";
        newDivPondOp.classList.add("entrada-valor-input");
        newDivPondOp.setAttribute('oninput','computa_preset()');
        valors.appendChild(newDivPondOp);
        valors.appendChild(newDivText);
    }


    const elemExplicacio = document.getElementById("calcul-fet");

    var explicacioTextAcc = "";

    if (ponderacions.length > 1) {
        explicacioTextAcc += "max("
        for (var p = 0; p < ponderacions.length; ++p) {
            explicacioTextAcc += genera_text_explicacio(nomsElements, ponderacions[p]);
            if (p != ponderacions.length - 1) explicacioTextAcc += ", \n"
        }
        explicacioTextAcc += ")"
    } else {
        explicacioTextAcc += genera_text_explicacio(nomsElements, ponderacions[0]);
    }

    elemExplicacio.textContent = explicacioTextAcc;
}

function computa_preset() {
    const volem = document.getElementById("preset-select").value;
    const [nomsElements, ponderacions] = presets[volem];
    const valors_raw = document.getElementById('container-valors').children;

    var valors = [];

    for (var i = 0; i < valors_raw.length; ++i) {
        const raw = valors_raw[i];
        if (raw.tagName == "INPUT") {
            valors.push(raw.value);
        }
    }

    var resultats = [];
    for (var p = 0; p < ponderacions.length; ++p) {
        var acc = 0;
        for (var i = 0; i < valors.length; ++i) {
            const ponderacio = ponderacions[p][i] / 100;
            var nota = parseFloat(valors[i]);
            if (valors[i] == "") nota = 0;
            acc += ponderacio * nota
        }

        resultats.push(acc);
    }
    const elemResultat = document.getElementById("resultat-final");
    const notaFinal = Math.round(Math.max(resultats) * 100) / 100;

    if (Number.isNaN(notaFinal)) {
        elemResultat.textContent = "<Entrada invàlida>";
    } else {
        elemResultat.textContent = notaFinal;
    }


    console.log("Abans de fer el màxim, les opcions de notes eren: ", resultats);
}

function genera_text_explicacio(noms, ponderacions) {
    var res = "";
    for (var i = 0; i < noms.length; ++i) {
        const pondPretty = Math.round(ponderacions[i] * 100) / 100;
        res += noms[i] + " " + "(" + pondPretty + "%" + ")";
        if (i != noms.length-1) res += " + ";
    }

    return res;
}
