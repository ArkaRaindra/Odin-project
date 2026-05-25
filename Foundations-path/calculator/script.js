const display = document.querySelector("#display");

let firstNumber = "";
let secondNumber = "";
let operator = "";
let resetDisplay = false;

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    if (b === 0) return "Error: Can't divide by zero";
    return a / b;
}

function square(a, b) {
    return a ** b;
}

function operate(operator, a, b) {
    a = Number(a);
    b = Number(b);

    switch (operator) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "X":
            return multiply(a, b);
        case "/":
            return divide(a, b);
        case "^":
            return square(a, b);
        default:
            return null;
    }
}

//Number buttons
const numberButtons = document.querySelectorAll(
    ".number, .zero"
);

numberButtons.forEach(button => {
    button.addEventListener("click", () => {

        if (resetDisplay) {
            display.value = "";
            resetDisplay = false;
        }

        display.value += button.textContent
    });
});

//Operator buttons
const operatorButtons = document.querySelectorAll(
    ".btnadd, .btnsubtract, .btnmultiply, .btndivide, .btnsquare"
);

operatorButtons.forEach(button => {
    button.addEventListener("click", () => {
        if (
            operator !== null &&
            display.value !== ""
        ) {
            secondNumber = display.value;

            firstNumber = operate(
                operator,
                firstNumber,
                secondNumber
            );
            display.value = firstNumber;
        }
        else {
            firstNumber = display.value;
        }
        operator = button.textContent;
        resetDisplay = true;
    });
});

document.querySelector(".equal")
.addEventListener("click", () => {

    if (
        operator === null ||
        display.value === ""
    ) return;

    secondNumber = display.value;

    const result = operate(
        operator,
        firstNumber,
        secondNumber
    );
    display.value = result;

    firstNumber = result;
    operator = null;
});

document.querySelector(".btnclear")
.addEventListener("click", () => {

    display.value = "";
    firstNumber = "";
    secondNumber = "";
    operator = null;
});

document.querySelector(".btndelete")
.addEventListener("click", () => {

    display.value =
    display.value.slice(0, -1);
});

document.querySelector(".btnplusminus")
.addEventListener("click", () => {

    if(display.value==="") return;

    display.value =
    Number(display.value) * -1;
});

document.querySelector(".coma")
.addEventListener("click", () => {

    if(resetDisplay){
        display.value = "0";
        resetDisplay = false;
    }

    if(!display.value.includes(".")) {
        display.value +- ".";
    }
});

//Keyboard support
document.addEventListener("keydown", (e) => {

    if(!isNaN(e.key)){

        if(resetDisplay) {
            display.value = "";
            resetDisplay = false;
        }
        display.value += e.key;
    }

    if (e.key === "." || e.key === ",") {

        if (resetDisplay) {
            display.value = "0";
            resetDisplay = false;
        }
        if (!display.value.includes(".")) {
            display.value += ".";
        }
    }

    const operators = ["+","-","*","/","^"];

    if(operators.includes(e.key)) {
        let symbol = e.key;

        if (symbol === "*") {
            symbol = "X";
        }
        if (
            operator !== null &&
            display.value !== ""
        ) {
            secondNumber = display.value;

            firstNumber = operate(
                operator,
                firstNumber,
                secondNumber
            );
            display.value = firstNumber;
        } else {
            firstNumber = display.value;
        }
        operator = symbol;
        resetDisplay = true;
    }

    if (e.key === "Enter" || e.key === "=") {

        if (
            operator === null ||
            display.value === ""
        ) return;

        secondNumber = display.value;

        const result = operate(
            operator,
            firstNumber,
            secondNumber
        );
        display.value = result;

        firstNumber = result;
        operator = null;
    }

    if (e.key === "Backspace") {
        display.value =
        display.value.slice(0, -1);
    }

    if (
        e.key === "Delete" ||
        e.key === "Escape"
    ) {

        display.value = "";

        firstNumber = "";
        secondNumber = "";
        operator = null;
    }
});