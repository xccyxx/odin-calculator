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
                result = add(a, b);
                break;
            case "-":
                result = subtract(a, b);
                break;
            case "*":
                result = multiply(a, b);
                break;
            case "/":
                result = divide(a, b);
                break;
        }
    }
    return Math.round(result * 1000) / 1000;
};

let a = '';
let operator = '';
let b = '';
let result = 0;
let displayValue = '';
let displayedOperator = '';
let currentInput = '';
let isResult = false;

const containClass = (e, className) => {
    return e.target.classList.contains(className);
}

const cleanUpValues = () => {
    a = '';
    operator = '';
    b = '';
    result = 0;
    currentInput = '';
    displayValue = '';
}

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");

container.addEventListener("click", event => {
    if (containClass(event, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(event, "number-button")) {
        if (isResult === true) {
            isResult = false;
            cleanUpValues();
        }
        if (currentInput === ''){
            currentInput = "a";
        }
        console.log(currentInput);
        if (currentInput === '' || currentInput === "a") {
            a += event.target.dataset.number;
            displayValue = a;
        } else if (currentInput === "b") {
            b += event.target.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }

    if (containClass(event, "arithmetic-button")) {
        operator = event.target.dataset.arithmetic;
        displayedOperator = event.target.innerText;        
        displayValue = `${a} ${displayedOperator} `;
        currentInput = "b";
    }

    if (containClass(event, "operate-button")) {
        result = operate(a, operator, b);
        displayValue = result;
        isResult = true;
    }
    displayContent.innerText = displayValue;
})