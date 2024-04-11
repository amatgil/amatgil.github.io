import init from "./pkg/fractals.js";
import { vonkoch, sierp, tree } from "./pkg/fractals.js";


await init();

// GENERAL
export async function toggle_fractal() {
    let chosen = document.getElementById("fractal-triat").value;

    console.log("TOGGLING", chosen);
    document.getElementById("vonkoch").style.display = "none";
    document.getElementById("sierp").style.display   = "none";
    document.getElementById("tree").style.display   = "none";

    if (chosen == "vonkoch") {
	document.getElementById("vonkoch").style.display = "block";
	get_vonkoch();
    } else if (chosen == "sierp") {
	document.getElementById("sierp").style.display = "block";
	get_sierp();
    } else if (chosen == "tree") {
	document.getElementById("tree").style.display = "block";
	get_tree();
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

// TREE
export async function get_tree() {
    let n = document.getElementById("tree-n").value;
    let theta = document.getElementById("tree-theta").value;
    let length = document.getElementById("tree-side-length").value;
    let s = tree(n, theta, length);

    let elem = document.getElementById("tree-holder");
    elem.outerHTML = s;
    console.log("Fent un arbre amb: ", n, theta, length);
    //console.log(s);
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
