const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => {
    // handle a value & Invalid Input
    a = parseFloat(a);
    if (Number.isNaN(a)) {
        return "Invalid Input";
    }
    // handle b value & empty b
    if (b !== '') {
        b = parseFloat(b);
    }

    // Handle pressing operate directly right after giving number a
    if (!Number.isNaN(a) && operator === '' && b === '') {
        return a;
    // calculation
    } else if (!Number.isNaN(a) && !Number.isNaN(b)) {
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
            default:
                return "Invalid Operator";
        }
    } 
    
    return Math.round(result * 1000) / 1000;
};

let a = '';
let operator = '';
let b = '';
let result;
let displayValue = '';
let displayedOperator = '';
let currentInput = "none";
let isResult = false;

const containClass = (e, className) => {
    return e.target.classList.contains(className);
}

const cleanUpValues = () => {
    a = '';
    operator = '';
    b = '';
    result = undefined;
    currentInput = 'none';
    displayValue = '';
}

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");

container.addEventListener("click", event => {
    if (containClass(event, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(event, "number-button")) {
        if (isResult) {
            isResult = false;
            cleanUpValues();
        }
        if (currentInput === 'none'){
            currentInput = "a";
        }
        if (currentInput === 'none' || currentInput === "a") {
            a += event.target.dataset.number;
            displayValue = a;
        } else if (currentInput === "b") {
            b += event.target.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }

    if (containClass(event, "arithmetic-button")) {
        if (currentInput === "none" && event.target.dataset.arithmetic === "-") {
            a += event.target.dataset.arithmetic;
            displayValue = a;
        }

        if (currentInput === "a") {
            currentInput = "b";
        }

        if (currentInput === "b") {
            if (isResult || b !== '') {   
                result = operate(a, operator, b);
                a = result;
                b = '';
                isResult = false;
            }
            operator = event.target.dataset.arithmetic;
            displayedOperator = event.target.innerText;        
            displayValue = `${a} ${displayedOperator} `;
        }

    }

    if (containClass(event, "operate-button")) {
        if (isResult) {
            a = result;
            isResult = false;
        }
        result = operate(a, operator, b);
        displayValue = result;
        isResult = true;
    }
    displayContent.innerText = displayValue;
})