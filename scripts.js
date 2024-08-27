const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => {
    a = +a;
    b = +b;
    if (!Number.isNaN(a) && !Number.isNaN(b)) {
        switch (operator) {
            case "+":
                solution = add(a, b);
                break;
            case "-":
                solution = subtract(a, b);
                break;
            case "*":
                solution = multiply(a, b);
                break;
            case "/":
                solution = divide(a, b);
                break;
        }
    }
    return Math.round(solution * 1000) / 1000;
};

let a = '';
let operator = '';
let b = '';
let solution;
let displayValue = '';
let displayedOperator = '';
let hasNumberA = false;
let hasNumberB = false;

const containClass = (e, className) => {
    return e.target.classList.contains(className);
}

const cleanUpValues = () => {
    a = '';
    operator = '';
    b = '';
    hasNumberA = false;
    hasNumberB = false;
}

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");

container.addEventListener("click", event => {
    if (containClass(event, "clear-button")) {
        cleanUpValues();
        displayValue = '';
    }

    if (containClass(event, "number-button")) {
        if (!hasNumberA) {
            if (solution) {
                cleanUpValues();
            }
            a += event.target.dataset.number;
            displayValue = a;
        } else if (!hasNumberB) {
            b += event.target.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }

    if (containClass(event, "arithmetic-button")) {
        operator = event.target.dataset.arithmetic;
        displayedOperator = event.target.innerText;
        if (a === solution) {
            displayValue = `${a} ${displayedOperator} `;
            hasNumberB = false;
        }
        if (a !== '' && b === '') {
            displayValue = `${a} ${displayedOperator} `;
            hasNumberA = true;
        }
    }

    if (containClass(event, "operate-button")) {
        solution = operate(a, operator, b);
        displayValue = solution;
        cleanUpValues();
        a = solution;
        console.log(a);
        console.log(b);
        console.log(operator);
    }
    displayContent.innerText = displayValue;
})