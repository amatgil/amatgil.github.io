

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
        [15,                     15,                 0,           70]]
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
    console.log(volem);
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

        var newDivPondOp = document.createElement("textarea");
        newDivPondOp.style.gridColumnStart = "1";
        newDivPondOp.style.gridColumnEnd = "2";


        valors.appendChild(newDivPondOp);
        valors.appendChild(newDivText);
    }
    

}

