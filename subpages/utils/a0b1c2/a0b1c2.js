
// You can tell which parts i copied from the binary one because they don't have
// semicolons lmao. Too much rust
function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

// Error handling? Pffft lmao
function toChar(input) {
    return String.fromCharCode('a'.charCodeAt(0) + input);
}
function fromChar(input) {
    return input.toLowerCase().charCodeAt(0) - 'a'.charCodeAt(0);
}

function isInputCorrect(current, input) {
    // current is char, input is number
    return fromChar(current) === input;
}

function inputhandler() {
    entrada.addEventListener("keyup", ({key}) => {
        if (key === "Enter") {
            if (entrada.value == "") {
                console.log("(whoops, invalid)")
                return;
            } 
            if (isInputCorrect(challenge.innerText, Number(entrada.value))) {
                feedback.innerHTML = 'Correcte! '.concat(challenge.innerText).concat('←').concat(entrada.value)
                feedback.style.color = "#048A47"
                let oldc = challenge.innerText;
                while (true) {
                    let newc = toChar(getRandomInt(parseInt(rangselec.value)+1));

                    if (newc != oldc) {
                        challenge.innerText = newc;
                        break;
                    }
                }
            } else {
                feedback.innerHTML = "Incorrecte :("
                feedback.style.color = "#DA6573"
            }
            entrada.value = null;
        }
    })
}


function putintothething() {
    entrada.value = fromChar(challenge.innerText).toString();
}


window.addEventListener('load', inputhandler)
window.addEventListener('load', () => skipbutton.addEventListener("click", putintothething))


