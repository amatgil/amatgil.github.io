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
		  document.getElementById("stick_bug").src = "/assets/media/StickBug.webm";
		  bug.style.display = "block";
		  clearInterval(id);
		  i = 0;
	  } else {
	    i++;
		console.log(width);
		width = f(i/100)*100;
		elem.style.width = width + "%";
	  }
    }
  }
} 

function f(x) {
	//return /*3*(x - x*x*x/3)/2*/;
	return 2*Math.pow(x, 3/2)/3/10;
}
