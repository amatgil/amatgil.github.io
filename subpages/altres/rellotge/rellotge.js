
const funNumbers = ["123456", "012345", "543210"];

export function updateTime() {
    let date = new Date()
    let c = fmt_time(date);
    let elem = document.getElementById('time-container');

    elem.innerText = c;

    if (is_special(date)) {
        weee();
    }

    setTimeout(updateTime, 200);
}

function weee() {
    console.log("Wheeing");
    let e = document.getElementById('wahoo');
    e.style.display = 'inline';
    e.classList.add("wahoo-class");
    e.addEventListener("animationend", function() {
        e.style.display = 'none';
    });
}

function is_special(date) {
    let h = date.getHours().toString().padStart(2, "0");
    let m = date.getMinutes().toString().padStart(2, "0");
    let s = date.getSeconds().toString().padStart(2, "0");

    let c = `${h}${m}${s}`;
    return funNumbers.includes(c);
}

function fmt_time(date) {
    let h = date.getHours().toString().padStart(2, "0");
    let m = date.getMinutes().toString().padStart(2, "0");
    let s = date.getSeconds().toString().padStart(2, "0");
    return `${h}:${m}:${s}`;
}
