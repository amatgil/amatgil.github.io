
const tau_digits = `28318530717958647692
528676655900576839433
879875021164194988918
461563281257241799725
606965068423413596429
617302656461329418768
921910116446345071881
625696223490056820540
387704221111928924589
790986076392885762195
133186689225695129646
757356633054240381829
129713384692069722090
865329642678721452049
828254744917401321263
117634976304184192565
850818343072873578518
072002266106109764093
304276829390388302321
886611454073151918390
618437223476386522358
621023709614892475992
549913470377150544978
245587636602389825966
734672488131328617204
278989279044947438140
435972188740554107843
435258635350476934963
693533881026400113625
429052712165557154268
551557921834727435744
293688180244990686029
309917074210158455937
851784708403991222425
804392172806883631962
725954954261992103741
442269999999`;

const init_pos = 4;
const delta_idx = 2;
var curr_pos = init_pos;

function initTest() {
	const shown = document.getElementById("curr_shown");
	const input = document.getElementById("curr_input");
	var curr_digits = tau_digits.slice(0, curr_pos);
	shown.innerHTML = curr_digits;

	input.onkeypress = function(e) {
		if (!e) e = window.event;
		var keyCode = e.code || e.key;
		if (keyCode == 'Enter'){
			shown.innerHTML = curr_digits;
			Test();
		}
	}
}
function Test() {
	const shown = document.getElementById("curr_shown");
	const input = document.getElementById("curr_input");
	const relays_res = document.getElementById("mocks-you-box");
	var curr_digits = tau_digits.slice(0, curr_pos);
	input.focus();

	var correct_answer = curr_digits.replace(/\r?\n|\r/g, "");
	if (input.value == "" && curr_pos == init_pos) {
		relays_res.style.display = "none";
	} else if (input.value != correct_answer) {
		relays_res.innerHTML = "Incorrecte! Era: " + curr_digits;
		relays_res.style.display = "block";
		relays_res.style.color = "Orchid";
		curr_pos = init_pos;
		shown.innerHTML = tau_digits.slice(0, curr_pos);
	} else {
		curr_pos += delta_idx;
		relays_res.style.display = "none";
		shown.innerHTML = "...." + tau_digits.slice(curr_pos - delta_idx, curr_pos);
	}
	input.value = "";
	input.focus();

	input.onkeypress = function(e) {
		if (!e) e = window.event;
		var keyCode = e.code || e.key;
		if (keyCode == 'Enter'){
			shown.innerHTML = curr_digits;
			Test();
		}
	}

}
