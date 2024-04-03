import init from "/subpages/utils/s-ic-mulador/pkg/sICmulador.js";
import { Processador } from "/subpages/utils/s-ic-mulador/pkg/sICmulador.js";


await init();
var proc = Processador.new("", "", "0", "", "");
var can_continue = false;

export async function populate_fields() {
    document.getElementById("regs").value = "0\n1\n7\n20\n";
    document.getElementById("mem-inicial").value = "0x0022 = \"0x0000\"\n0x0024 = \"0x0002\"\n0x0026 = \"0xFFFB\"";
    document.getElementById("instruccions").value = "ADD R0, R0, R1\nADD R0, R0, R1\nADD R0, R0, R1";
    document.getElementById("io").value = "0 = \"0x0001\"\n1 = \"0x0005\"";
    document.getElementById("pc").value = "0";
}

export async function init_unit() {
    await init();

    let regs = document.getElementById("regs").value;
    let mem = document.getElementById("mem-inicial").value;
    let ins = document.getElementById("instruccions").value;
    let io = document.getElementById("io").value;
    let pc = document.getElementById("pc").value;

    console.log("----");
    console.log(regs);
    console.log(mem);
    console.log(ins);
    console.log(io);

    proc = Processador.new( // GLOBAL VARIABLE 
    	regs,
    	mem,
    	"0", // init_pc
    	ins,   
    	io,
    );
    document.getElementById("memory-information").value = proc.current_memory();
    document.getElementById("regs-box").value = proc.current_regs();

    can_continue = true;
    get_and_show_status();
}

function get_and_show_status() {
    let s = "";
    if (can_continue) {
	s = s.concat("La execució no ha acabat");
    } else {
	s = s.concat("El PC ha arribat al final de la execució");
	document.getElementById("info-box").value = "S'han acabat les instruccions";
    }
    document.getElementById("info-box").value = s;

    return s;
}

export async function advance_unit() {
    if (can_continue) {
	can_continue = proc.execute_next();
    } else {
    }

    document.getElementById("memory-information").value = proc.current_memory();
    document.getElementById("regs-box").value = proc.current_regs();
    get_and_show_status();

    console.log("Advanced");
    console.log(proc.current_memory());
}

export async function advance_all() {
    console.log("Not yet done, advance ALL here");
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
