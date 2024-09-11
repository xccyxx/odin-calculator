const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => {
    a = parseFloat(a);
    b = parseFloat(b);

    if (!Number.isNaN(a) && typeof(a) === "number" && !Number.isNaN(b) && typeof(b) === "number") {
        // calculation
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
let currentInput = "a";
let isResult = false;


const containClass = (e, className) => {
    return e.target.classList.contains(className);
}

const cleanUpValues = () => {
    a = '';
    operator = '';
    b = '';
    result = undefined;
    currentInput = 'a';
    displayValue = '';
    isResult = false;
}

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");

container.addEventListener("click", event => {
    if (containClass(event, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(event, "number-button")) {
        if (currentInput === "b" && isResult) {
            cleanUpValues();
            currentInput = "a";
        }

        if (currentInput === "a") {
            a += event.target.dataset.number;
            displayValue = a;
        } else {
            b += event.target.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }

    if (containClass(event, "arithmetic-button")) {

        if (currentInput === "a" && !isResult && (a === "" || a === "-")) {
            if (event.target.dataset.arithmetic === "+") {
                a = "";
            }
            if (event.target.dataset.arithmetic === "-") {
                a = event.target.dataset.arithmetic;
            }
            displayValue = a;
        } else if (currentInput === "a") {
            currentInput = "b";
        }


        // Pressing arithmetic button right after a calculation
        if (currentInput === "b" && b !== '') {
            a = operate(a, operator, b);
            b = "";
        }

        // the operator is only valid after a valid number a
        if (a !== '' && a !== '-') {
            operator = event.target.dataset.arithmetic;
            displayedOperator = event.target.innerText;        
            displayValue = `${a} ${displayedOperator} `;
        }
    }

    if (containClass(event, "operate-button")) {
        if (isResult) {
            a = result;
            result = operate(a, operator, b);
        }
        if (!isResult) {
            result = operate(a, operator, b);
            isResult = true;
        }
        displayValue = result;

    }
    displayContent.innerText = displayValue;
    console.log(currentInput);

})