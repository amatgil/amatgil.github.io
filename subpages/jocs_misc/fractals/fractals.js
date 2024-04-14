import init from "./pkg/fractals.js";
import { vonkoch, sierp, tree, pythagorean_tree, generate_l_fractal } from "./pkg/fractals.js";


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
export async function get_l_system() {
    let n = document.getElementById("l-system-n").value;
    let axiom = document.getElementById("l-system-axiom").value;
    let start_x = document.getElementById("l-system-start-x").value;
    let start_y = document.getElementById("l-system-start-y").value;
    let start_dir = document.getElementById("l-system-start-dir").value;
    let line_length = document.getElementById("l-system-line-length").value;

    //let s = generate_l_fractal(
    //	n, axiom, rules, turtle_mapping, start_x, start_y, start_direction, line_length
    //);

    let elem = document.getElementById("l-system-holder");
    //elem.outerHTML = s;
    //console.log(
    //	"L-System with: ", n, axiom, rules, turtle_mapping, start_x, start_y, start_direction, line_length
    //);
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

var ids_set = 1;
export async function l_system_add_turtle_button() {
    ids_set += 1;
    let new_div_inner = l_system_get_turtle_input(ids_set);
    let new_div = document.createElement('div');
    new_div.innerHTML = new_div_inner;
    new_div.classList.add("l-system-turtle-input");
    new_div.id = "l-system-turtle-dynamically-spawned-div-" + ids_set;

    let dynamic_holder = document.getElementById("l-system-dynamic-inputs");
    dynamic_holder.appendChild(new_div);

}

export async function l_system_delete_dynamic_div(i) {
    let elem = document.getElementById("l-system-turtle-dynamically-spawned-div-" + i);
    elem.remove();
}


function l_system_get_turtle_input(i) {
    
    let new_div = //`<div class=\"l-system-turtle-input\">
`
<div class=\"l-system-turtle-radio-bunch\">
<span><input type=\"radio\" name=\"l-system-turtl-radio-${i}\" value=\"rotate\">Girar (graus)</span>
<span><input type=\"radio\" name=\"l-system-turtl-radio-${i}\" value=\"advance\">Avançar (mult)</span>
<span><input type=\"radio\" name=\"l-system-turtl-radio-${i}\" value=\"draw\">Dibuixar (mult)</span>
</div>
<div class=\"l-system-keyboard-input-wrapper\">
<input type=\"text\" class=\"l-system-turtle-text-input\" id=\"l-system-input-name-${i}\" maxlength=\"1\" width=\"3em\" placeholder=\"Char\" oninput=\"get_l_system()\" />
<input type=\"text\" class=\"l-system-turtle-numeric-input\" id=\"l-system-numeric-input-${i}\" maxlength=\"1\" width=\"3em\" placeholder=\"Valor\" oninput=\"get_l_system()\" />
<button class="l-system-dynamic-input-delete-button" onclick=\"l_system_delete_dynamic_div(${i})\">Delete</button>
</div>`;
//</div>`;

    return new_div;
}
