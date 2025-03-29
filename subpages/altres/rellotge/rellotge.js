
const funNumbers = [
    "000000",
    "010001", "011111", "012345",
    "020002", "022222", "023456",
    "030003", "033333",
    "040004", "044444",
    "050005", "055555", "054321",
    "060006", "065432",
    "070007",
    "080008",
    "090009",
    "100001",
    "111111",
    "122221", "123456",
    "133331",
    "144441",
    "155551",
    "200002",
    "211112",
    "222222",
    "233332",
];

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

export function weee() {
    console.log("Weeing: engaged");
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
