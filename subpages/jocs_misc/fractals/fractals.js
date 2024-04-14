import init from "./pkg/fractals.js";
import { vonkoch,
	 sierp,
	 tree,
	 pythagorean_tree,
	 generate_l_fractal,
	 get_empty_rules_map,
	 get_empty_turtle_map,
	 add_to_turtle_map,
	 add_to_rules_map
       } from "./pkg/fractals.js";


await init();

// GENERAL
export async function toggle_fractal() {
    let chosen = document.getElementById("fractal-triat").value;

    console.log("TOGGLING", chosen);
    document.getElementById("vonkoch").style.display   = "none";
    document.getElementById("sierp").style.display     = "none";
    document.getElementById("tree").style.display      = "none";
    document.getElementById("pyth-tree").style.display = "none";
    document.getElementById("l-system").style.display  = "none";

    if (chosen == "vonkoch") {
	document.getElementById("vonkoch").style.display = "block";
	get_vonkoch();
    } else if (chosen == "sierp") {
	document.getElementById("sierp").style.display = "block";
	get_sierp();
    } else if (chosen == "tree") {
	document.getElementById("tree").style.display = "block";
	get_tree();
    } else if (chosen == "pyth") {
	document.getElementById("pyth-tree").style.display = "block";
	get_pyth_tree();
    } else if (chosen == "l-system") {
	document.getElementById("l-system").style.display = "block";
	get_l_system();
    }

}

// VON KOCH
export async function get_vonkoch() {
    let n = document.getElementById("vonkoch-n").value;
    let anti = document.getElementById("vonkoch-anti").checked;
    console.log(anti);
    let s = vonkoch(n, anti);

    let elem = document.getElementById("vonkoch-holder");
    elem.outerHTML = s;
    console.log(s);
}


export async function koch_inc_n() {
    let n = 1*document.getElementById("vonkoch-n").value; // To number (for some reason)
    document.getElementById("vonkoch-n").value = Math.min(n + 1, 8);
    get_vonkoch();
}

export async function koch_dec_n() {
    let n = 1*document.getElementById("vonkoch-n").value; // To number (for some reason)
    document.getElementById("vonkoch-n").value = Math.max(n - 1, 0);
    get_vonkoch()
}

// SIERP
export async function get_sierp() {
    let n = document.getElementById("sierp-n").value;
    let s = sierp(n);

    let elem = document.getElementById("sierp-holder");
    elem.outerHTML = s;
    console.log(s);
}

export async function sierp_inc_n() {
    let n = 1*document.getElementById("sierp-n").value; // To number (for some reason)
    document.getElementById("sierp-n").value = Math.min(n + 1, 8);
    get_sierp();
}


export async function sierp_dec_n() {
    let n = 1*document.getElementById("sierp-n").value; // To number (for some reason)
    document.getElementById("sierp-n").value = Math.max(n - 1, 0);
    get_sierp();
}

// BASIC TREE
export async function get_tree() {
    let n = document.getElementById("tree-n").value;
    let theta = document.getElementById("tree-theta").value;
    let length = document.getElementById("tree-side-length").value;
    let multiplier = document.getElementById("tree-multiplier").value;
    let s = tree(n, theta, length, multiplier);

    let elem = document.getElementById("tree-holder");
    elem.outerHTML = s;
    console.log("Fent un arbre amb: ", n, theta, length, multiplier);
}
export async function tree_inc_n() {
    let n = 1*document.getElementById("tree-n").value; // To number (for some reason)
    document.getElementById("tree-n").value = Math.min(n + 1, 13);
    get_tree();
}
export async function tree_dec_n() {
    let n = 1*document.getElementById("tree-n").value; // To number (for some reason)
    document.getElementById("tree-n").value = Math.max(n - 1, 0);
    get_tree();
}

// PYTH TREE
export async function get_pyth_tree() {
    let n = document.getElementById("pyth-tree-n").value;
    let theta = document.getElementById("pyth-tree-theta").value;
    let length = document.getElementById("pyth-tree-side-length").value;
    let s = pythagorean_tree(n, theta, length);

    let elem = document.getElementById("pyth-tree-holder");
    elem.outerHTML = s;
    console.log("Fent un arbre amb: ", n, theta, length);
}

export async function pyth_tree_inc_n() {
    let n = 1*document.getElementById("pyth-tree-n").value; // To number (for some reason)
    document.getElementById("pyth-tree-n").value = Math.min(n + 1, 13);
    get_pyth_tree();
}

export async function pyth_tree_dec_n() {
    let n = 1*document.getElementById("pyth-tree-n").value; // To number (for some reason)
    document.getElementById("pyth-tree-n").value = Math.max(n - 1, 0);
    get_pyth_tree();
}

// L-system

// L-System presets
var l_system_cantor_preset = { // Unused, 1D ones look bad
    'axiom': "A",
    'start_x': 10,
    'start_y': 10,
    'start_direction': 0,
    'line_length': 10,
    'rules': [
	["A", "ABA"],
	["B", "BBB"]
    ],
    'turtles': [
	['A', "draw", 1],
	['B', "advance", 1],
    ]
};
var l_system_sierp_preset = {
    'axiom': "F-G-G",
    'start_x': 520,
    'start_y': 1200,
    'start_direction': 0,
    'line_length': 10,
    'rules': [
	["F", "F-G+F+G-F"],
	["G", "GG"]
    ],
    'turtles': [
	['F', "draw", 1],
	['G', "draw", 1],
	['+', "rotate", -120],
	['-', "rotate", 120]
    ]
};

var l_system_dragon_preset = {
    'axiom': "F-G-G",
    'start_x': 520,
    'start_y': 1200,
    'start_direction': 0,
    'line_length': 50,
    'rules': [
	["F", "F+G"],
	["G", "F-G"]
    ],
    'turtles': [
	['F', "draw", 1],
	['G', "draw", 1],
	['+', "rotate", 90],
	['-', "rotate", -90]
    ]
};

var l_system_koch_preset = {
    'axiom': "F-G-G",
    'start_x': 520,
    'start_y': 1200,
    'start_direction': 0,
    'line_length': 10,
    'rules': [
	["F", "F+F-F-F+F"],
    ],
    'turtles': [
	['F', "draw", 1],
	['+', "rotate", 90],
	['-', "rotate", -90]
    ],

};
export async function get_l_system() {
    let n = document.getElementById("l-system-n").value;
    let axiom = document.getElementById("l-system-axiom").value;
    let start_x = document.getElementById("l-system-start-x").value;
    let start_y = document.getElementById("l-system-start-y").value;
    let start_direction= document.getElementById("l-system-start-dir").value;
    let line_length = document.getElementById("l-system-line-length").value;

    let turtle_rules = get_empty_turtle_map();
    for (const id of used_turtle_ids) {
	console.log(id);
	let radio = document.querySelector(`input[type="radio"][name="l-system-turtle-radio-${id}"]:checked`)?.value ?? "[Couldn't read radio button lmao]";
	let ch = document.getElementById("l-system-input-name-" + id).value;
	let v = document.getElementById("l-system-numeric-input-" + id).value;
	console.log("Updating with: ", radio, ch, v);
	turtle_rules = add_to_turtle_map(turtle_rules, ch, radio, v);
    }

    let axiom_rules = get_empty_rules_map(); // lmao
    for (const id of used_rules_ids) {
	console.log(id);
	let lhs = document.getElementById("l-system-rules-lhs-" + id).value;
	let rhs = document.getElementById("l-system-rules-rhs-" + id).value;
	console.log("Updating rules with: ", lhs);
	axiom_rules = add_to_rules_map(axiom_rules, lhs, rhs);
    }


    let s = generate_l_fractal(
    	n, axiom, axiom_rules, turtle_rules, start_x, start_y, start_direction, line_length
    );

    console.log(s);
    let elem = document.getElementById("l-system-holder");
    elem.outerHTML = s;
    console.log(
    	n, axiom, axiom_rules, turtle_rules, start_x, start_y, start_direction, line_length
    );
}

export async function l_system_inc_n() {
    let n = 1*document.getElementById("l-system-n").value; // To number (for some reason)
    document.getElementById("l-system-n").value = Math.min(n + 1, 13);
    get_l_system();
}

export async function l_system_dec_n() {
    let n = 1*document.getElementById("l-system-n").value; // To number (for some reason)
    document.getElementById("l-system-n").value = Math.max(n - 1, 0);
    get_l_system();
}

var used_turtle_ids = new Set();
export async function l_system_add_turtle_button() {
    let id;
    for (let i = 0; i < 200; ++i) {
	if (!used_turtle_ids.has(i)) {
	    id = i;
	    used_turtle_ids.add(i);
	    break;
	}
    }
    let new_div_inner = l_system_get_turtle_input(id);
    let new_div = document.createElement('div');
    new_div.innerHTML = new_div_inner;
    new_div.classList.add("l-system-turtle-input");
    new_div.id = "l-system-turtle-dynamically-spawned-turtle-div-" + id;

    let dynamic_holder = document.getElementById("l-system-dynamic-turtle-inputs");
    dynamic_holder.appendChild(new_div);

    return id;
}

var used_rules_ids = new Set();
export async function l_system_add_rules_button() {
    let id;
    for (let i = 0; i < 200; ++i) {
	if (!used_rules_ids.has(i)) {
	    id = i;
	    used_rules_ids.add(i);
	    break;
	}
    }
    let new_div_inner = l_system_get_rules_input(id);
    let new_div = document.createElement('div');
    new_div.innerHTML = new_div_inner;
    new_div.classList.add("l-system-rules-input");
    new_div.id = "l-system-rules-dynamically-spawned-rules-div-" + id;

    let dynamic_holder = document.getElementById("l-system-dynamic-rules-inputs");
    dynamic_holder.appendChild(new_div);

    console.log("Created rules box, id = ", id);
    return id;
}

export async function l_system_delete_dynamic_turtle_div(i) {
    let elem = document.getElementById("l-system-turtle-dynamically-spawned-turtle-div-" + i);
    used_turtle_ids.delete(i);
    elem.remove();
}

export async function l_system_delete_dynamic_rules_div(i) {
    let elem = document.getElementById("l-system-rules-dynamically-spawned-rules-div-" + i);
    used_rules_ids.delete(i);
    elem.remove();
}



function l_system_get_turtle_input(i) {
    
    let new_div = 
`<div class=\"l-system-turtle-radio-bunch\">
<div>
<input type=\"radio\" name=\"l-system-turtle-radio-${i}\" id=\"l-system-turtle-radio-${i}-rotate\" onchange=\"get_l_system()\" value=\"rotate\" checked=\"checked\">
<label for=\"l-system-turtle-radio-${i}-rotate\">Girar (graus)</label>
</div>
<div>
<input type=\"radio\" name=\"l-system-turtle-radio-${i}\" id=\"l-system-turtle-radio-${i}-advance\" onchange=\"get_l_system()\" value=\"advance\">
<label for=\"l-system-turtle-radio-${i}-advance\">Avançar (mult)</label>
</div>
<div>
<input type=\"radio\" name=\"l-system-turtle-radio-${i}\" id=\"l-system-turtle-radio-${i}-draw\" onchange=\"get_l_system()\" value=\"draw\">
<label for=\"l-system-turtle-radio-${i}-draw\">Dibuixar (mult)</label>
</div>
</div>
<div class=\"l-system-keyboard-input-wrapper\">
<input type=\"text\" class=\"l-system-turtle-text-input\" id=\"l-system-input-name-${i}\" maxlength=\"1\" width=\"3em\" placeholder=\"Char\" oninput=\"get_l_system()\" />
<input type=\"text\" class=\"l-system-turtle-numeric-input\" id=\"l-system-numeric-input-${i}\" maxlength=\"4\" width=\"3em\" placeholder=\"Valor\" value=\"1\"oninput=\"get_l_system()\" />
<button class="l-system-dynamic-input-delete-turtle-button" onclick=\"l_system_delete_dynamic_turtle_div(${i})\">Delete</button>
</div>`;

    return new_div;
}


function l_system_get_rules_input(i) {
    
    let new_div = 
`<input type="text" id="l-system-rules-lhs-${i}" class="l-system-rules-box" oninput="get_l_system()" />
<p class="l-system-rules-arrow"> &rarr; </p>
<input type="text" id="l-system-rules-rhs-${i}" class="l-system-rules-box" oninput="get_l_system()" />
<button class="l-system-dynamic-input-delete-rules-button" onclick="l_system_delete_dynamic_rules_div(${i})">Delete</button>`;
    return new_div;
}


export async function l_system_apply_example() {
    let chosen = document.getElementById("l-system-examples-selector").value;

    let axiom = document.getElementById("l-system-axiom");
    let start_x = document.getElementById("l-system-start-x");
    let start_y = document.getElementById("l-system-start-y");
    let start_direction= document.getElementById("l-system-start-dir");
    let line_length = document.getElementById("l-system-line-length");

    console.log("Applying example", chosen);
    if (chosen == "sierp") {
	l_system_apply_preset(
	    l_system_sierp_preset,
	    axiom, start_x, start_y, start_direction, line_length
	);
    } /*else if (chosen == "cantor") {
	l_system_apply_preset(
	    l_system_cantor_preset,
	    axiom, start_x, start_y, start_direction, line_length
	);
	}*/
    else if (chosen == "koch") {
	l_system_apply_preset(
	    l_system_koch_preset,
	    axiom, start_x, start_y, start_direction, line_length
	);
    } else if (chosen == "dragon") {
	l_system_apply_preset(
	    l_system_dragon_preset,
	    axiom, start_x, start_y, start_direction, line_length
	);
    }
}

async function l_system_apply_preset(
    preset, axiom, start_x, start_y, start_direction, line_length
) {
    console.log("Applying preset", preset);
    // Clear current ones
    for (const id of used_turtle_ids) { l_system_delete_dynamic_turtle_div(id); }
    for (const id of used_rules_ids) { l_system_delete_dynamic_rules_div(id); }

    axiom.value = preset.axiom;
    start_x.value = preset.start_x
    start_y.value = preset.start_y
    start_direction.value = preset.start_direction;
    line_length.value = preset.line_length;

    for (const rule of preset.rules) {
	let id = await l_system_add_rules_button();
	document.getElementById("l-system-rules-lhs-" + id).value = rule[0];
	document.getElementById("l-system-rules-rhs-" + id).value = rule[1];
    }

    for (const turtle of preset.turtles) {
	let id = await l_system_add_turtle_button();
	console.log(id);
	document.getElementById("l-system-input-name-" + id).value = turtle[0];
	document.getElementById("l-system-turtle-radio-" + id + "-" + turtle[1]).checked = "checked";
	document.getElementById("l-system-numeric-input-" + id).value = turtle[2];
    }

    get_l_system();
}
