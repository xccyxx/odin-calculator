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


const containClass = (targetButton, className) => {
    return targetButton.classList.contains(className);
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
    let targetButton = event.target
    
    if (containClass(targetButton, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(targetButton, "number-button")) {
        if (currentInput === "b" && isResult) {
            cleanUpValues();
            currentInput = "a";
        }

        if (currentInput === "a") {
            a += targetButton.dataset.number;
            displayValue = a;
        } else {
            b += targetButton.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }

    if (containClass(targetButton, "arithmetic-button")) {
        if (currentInput === "a" && !isResult && (a === "" || a === "-")) {
            if (targetButton.dataset.arithmetic === "+") {
                a = "";
            }
            if (targetButton.dataset.arithmetic === "-") {
                a = targetButton.dataset.arithmetic;
            }
            displayValue = a;
        } else if (currentInput === "a") {
            currentInput = "b";
        }

        // Pressing arithmetic button right after a calculation
        if (currentInput === "b" && b !== '') {
            a = operate(a, operator, b);
            b = "";
            isResult = false;
        }

        // the operator is only valid after a valid number a
        if (a !== '' && a !== '-') {
            operator = targetButton.dataset.arithmetic;
            displayedOperator = targetButton.innerText;        
            displayValue = `${a} ${displayedOperator} `;
        }
    }

    if (containClass(targetButton, "operate-button")) {
        // handle no operator and no b
        if (operator === "" && b === "") {
            result = a;
        } else {
            // handle no b only, always repeat the calculation using the initial value of a
            if (b === "") {
                b = a;
                }
            // instant calculation for multiple clicks
            if (isResult) {
                a = result;
            } else {
                // the state of current displaying value should be the result only
                isResult = true;
            } 
            result = operate(a, operator, b);
        }
        displayValue = result;
    }
    displayContent.innerText = displayValue;
})