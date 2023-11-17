function process_robux() {
	var input_screen = document.getElementById('input-screen');
	var output_screen = document.getElementById('results-screen');
	input_screen.style.display = "none";
	output_screen.style.display = "block";
	console.log("hi");
	progress_bar();
}

var i = 0;
function progress_bar() {
  console.log("Bar-ing");
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("virus_progress_bar");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 100) {
	      var bug = document.getElementById("stick_bug");
		  bug.style.display = "block";
        clearInterval(id);
        i = 0;
      } else {
        width += bell(i)/i/10;
        elem.style.width = width + "%";
      }
    }
  }
} 

function bell(x) {
	return Math.exp(-x*x);
}
