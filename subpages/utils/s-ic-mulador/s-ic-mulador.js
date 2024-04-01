import init from "/subpages/utils/s-ic-mulador/pkg/sICmulador.js";
import { Processador } from "/subpages/utils/s-ic-mulador/pkg/sICmulador.js";

export async function run_unit() {
    await init();
    let proc = Processador.new(
    	"1\n2\n1\n4", // init_regs
    	"0x050 = \"0x0070\"", // init_mem
    	"0", // init_pc
    	"ADD R2, R2, R1\nADD R2, R2, R1", //instrs
    	"" // init_io
    );
    let v = proc.execute_next();
    console.log(v);
    let y = proc.execute_next();
    console.log(y);

    console.log("AA"); 
}

function wait(time) {
    return new Promise(resolve => {
        setTimeout(resolve, time);
    });
}
