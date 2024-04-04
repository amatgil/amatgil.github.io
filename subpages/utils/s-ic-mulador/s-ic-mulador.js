import init from "/subpages/utils/s-ic-mulador/pkg/sICmulador.js";
import { Processador } from "/subpages/utils/s-ic-mulador/pkg/sICmulador.js";


await init();
var proc;
var can_continue = false;
var loaded_instructions = "ADD R0, R0, R1\nADD R0, R0, R1\nADD R0, R0, R1";

populate_fields();
init_unit();


export async function populate_fields() {
    document.getElementById("regs").value = "0\n1\n7\n20\n";
    document.getElementById("mem-inicial").value = "0x0022 = \"0x0000\"\n0x0024 = \"0x0002\"\n0x0026 = \"0xFFFB\"";
    document.getElementById("instruccions").value = loaded_instructions;
    document.getElementById("io").value = "0 = \"0x0001\"\n1 = \"0x0005\"";
    document.getElementById("pc").value = "0x0000";
}

export async function init_unit() {
    await init(); // wasm

    let regs = document.getElementById("regs").value.trim();
    let mem = document.getElementById("mem-inicial").value.trim();
    let ins = document.getElementById("instruccions").value.trim();
    let io = document.getElementById("io").value.trim();
    let pc = 0; // document.getElementById("pc").value; (Agafar-lo és molt liòs, millor que no)


    try {
	proc = Processador.new( // GLOBAL VARIABLE 
	    regs,
	    mem,
	    "0", // init_pc (no l'agafem de l'entrada, millor ho fem sempre desde 0)
	    ins,   
	    io,
	);
    } catch(err) {
	let s = "ERROR: ";
	s = s.concat(err);
	s = s.concat("\n\nVerifiqueu les entrades, si us plau");
	document.getElementById("info-box").value = s;
	return;
    }

    loaded_instructions = ins;
    document.getElementById("memory-information").value = proc.current_memory();
    document.getElementById("regs-box").value = proc.current_regs();
    document.getElementById("pc").value = proc.current_pc();

    can_continue = true;
    get_and_show_status();
    instruct_color_when_changed();
}

function get_and_show_status() {
    let s = "";
    if (can_continue) {
	s = s.concat("- La execució no ha acabat");

	s = s.concat("\n- INSTRUCCIONS: En portem [");
	let ins = proc.curr_fast_and_slow();
	s = s.concat(ins[0]);
	s = s.concat("] de ràpides i [");
	s = s.concat(ins[1]);
	s = s.concat("] de lentes.");

	s = s.concat("\n- El PC actual és [");
	s = s.concat(proc.current_pc());
	s = s.concat("]");
    } else {
	s = s.concat("- Ha acabat l'execució");
	s = s.concat("\n- INSTRUCCIONS: Al final, se n'han executat [");
	let ins = proc.curr_fast_and_slow();
	s = s.concat(ins[0]);
	s = s.concat("] de ràpides i [");
	s = s.concat(ins[1]);
	s = s.concat("] de lentes.");

	s = s.concat("\n- El PC final queda: [");
	s = s.concat(proc.current_pc());
	s = s.concat("]");
    }
    if (proc.current_outted() !== "") {
	s = s.concat("\n\n- OUT: [\n");
	s =s.concat(proc.current_outted());
	s = s.concat("\n]");
    }

    document.getElementById("info-box").value = s;
    return s;
}

export async function advance_unit() {
    if (can_continue) { can_continue = proc.execute_next(); } 

    document.getElementById("memory-information").value = proc.current_memory();
    document.getElementById("regs-box").value = proc.current_regs();
    document.getElementById("pc").value = proc.current_pc();
    get_and_show_status();

    console.log("Avançant un cop...");
}

export async function advance_all() {
    console.log("Avançant fins al final");
    while (can_continue) { advance_unit(); }
}

export async function instruct_color_when_changed() {
    console.log("Changing");
    let curr_ins = document.getElementById("instruccions");

    if (curr_ins.value.trim() != loaded_instructions) {
	console.log("RED");
	curr_ins.style.color = "#ff0000";
    } else {
	console.log("NORMAL");
	curr_ins.style.color = ""; // Reset to the css value
    }
    console.log("todo!()");
}
