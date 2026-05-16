// =======================
// CALCULATOR STATE
// =======================
let input1 = "";
let input2 = "";
let operator = "";
let result = "";
let expression = "";

// =======================
// INPUT HANDLING
// =======================
function appendnumber(num) {
    input1 += num;
    document.getElementById("num1").value = input1;
}

function setoperator(op) {
    if (input1 === "") return;

    if (input2 !== "") {
        calculate();
    }

    input2 = input1;
    operator = op;
    input1 = "";
}

// =======================
// CALCULATION
// =======================
function calculate() {
    if (operator === "" || input2 === "" || input1 === "") return;

    let num1 = Number(input2);
    let num2 = Number(input1);

    if (operator === "+") {
        result = num1 + num2;
        expression = `${num1} + ${num2}`;
    }

    else if (operator === "-") {
        result = num1 - num2;
        expression = `${num1} - ${num2}`;
    }

    else if (operator === "*") {
        result = num1 * num2;
        expression = `${num1} × ${num2}`;
    }

    else if (operator === "/") {
        if (num2 === 0) {
            alert("Cannot divide by zero");
            return;
        }
        result = num1 / num2;
        expression = `${num1} ÷ ${num2}`;
    }

    input1 = result.toString();
    input2 = "";
    operator = "";

    document.getElementById("num1").value = input1;

    // IMPORTANT: save history correctly
    addcalculation(expression, result);
    displayhistory();
}

// =======================
// CLEAR
// =======================
function displayClear() {
    input1 = "";
    input2 = "";
    operator = "";
    result = "";
    expression = "";
    document.getElementById("num1").value = "";
}

// =======================
// DELETE LAST DIGIT
// =======================
function deletenumber() {
    input1 = input1.slice(0, -1);
    document.getElementById("num1").value = input1;
}

// =======================
// HISTORY
// =======================
let history = JSON.parse(localStorage.getItem("calcHistory")) || [];

function addcalculation(expr, res) {
    if (!expr || res === undefined) return;

    let item = `${expr} = ${res}`;
    history.push(item);

    localStorage.setItem("calcHistory", JSON.stringify(history));

    if (history.length > 1200) {
        history.shift();
    }
}

function displayhistory() {
    let list = document.getElementById("historylist");
    list.innerHTML = "";

    history.forEach((item) => {
        let li = document.createElement("li");
        li.textContent = item;
        list.appendChild(li);
    });
}

function clearhistory() {
    history = [];
    localStorage.removeItem("calcHistory");
    displayhistory();
}

// =======================
// SIDEBAR TOGGLE
// =======================
function showhistorybar() {
    const sidebar = document.querySelector(".sidebar");
    const btn = document.getElementById("showhistorybtn");

    sidebar.classList.toggle("active");

    btn.textContent = sidebar.classList.contains("active")
        ? "HIDE HISTORY"
        : "SHOW HISTORY";
}

// =======================
// KEYBOARD INPUT (FIXED - SINGLE HANDLER)
// =======================
document.addEventListener("keydown", function (event) {

    const key = event.key;

    // Numbers
    if (key >= "0" && key <= "9") {
        appendnumber(key);
    }

    // Decimal
    else if (key === ".") {
        appendnumber(".");
    }

    // Operators
    else if (key === "+") setoperator("+");
    else if (key === "-") setoperator("-");
    else if (key === "*") setoperator("*");
    else if (key === "/") setoperator("/");

    // Enter = calculate
    else if (key === "Enter") {
        event.preventDefault();
        calculate();
    }

    // Backspace = delete
    else if (key === "Backspace") {
        event.preventDefault();
        deletenumber();
    }

    // Clear
    else if (key === "Delete") {
        displayClear();
    }
});

// =======================
// INIT HISTORY ON LOAD
// =======================
window.onload = function () {
    displayhistory();
};
