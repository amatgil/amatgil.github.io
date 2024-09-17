function toggleAceFlag() {
	console.log("Toggling Ace Flag");
	let title = document.getElementById("main-amatgil-title");
	if (getCookie("aceFlag") == "true") {
		title.style.background = "none";
		setCookie("aceFlag","false", 1);
	} else {
		title.style.background = "-webkit-linear-gradient(#000000EE, #A3A3A3EE, #FFFFFFEE, #800080EE)";
		setCookie("aceFlag","true", 1);
	}
}
function showAceFlag() {
	let title = document.getElementById("main-amatgil-title");
	if (getCookie("aceFlag") == "true") {
		title.style.background = "-webkit-linear-gradient(#000000EE, #A3A3A3EE, #FFFFFFEE, #800080EE)";
	} else {
		title.style.background = "none";
	}
}

function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
  let expires = "expires="+d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/;SameSite=Lax;";
}

function getCookie(cname) {
  let name = cname + "=";
  let ca = document.cookie.split(';');
  for(let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function toggleLightModeStatus() {
    if (getCookie("veryLightMode") == "true") {
        setCookie("veryLightMode","false", 1);
    } else {
        setCookie("veryLightMode","true", 1);
    }
    toggleLightModeStyle();
}

function loadLightModeStyle() {
    if (getCookie("veryLightMode") == "true") {
        var xs = document.getElementsByTagName('*');
        for (var i = xs.length; i--;) {
            xs[i].classList.add("very-light-mode");
        }
    }
}

function toggleLightModeStyle() {
    var xs = document.getElementsByTagName('*');
    for (var i = xs.length; i--;) {
        xs[i].classList.toggle("very-light-mode");
    }
}
