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

    if (!Number.isNaN(a) && typeof(a) === "number") {
        // Handle pressing operate directly right after giving number a
        if (b === '') {
            if (operator === '') {
                return a;
            } else if (!isOperateSelf) {
                b = a;
                isOperateSelf = true;
            }   
        }
        
        if (!Number.isNaN(b) && typeof(b) === "number") {
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
    }
    
    return Math.round(result * 1000) / 1000;
};

let a = '';
let operator = '';
let b = '';
let result;
let displayValue = '';
let displayedOperator = '';
let currentInput = "";
let isResult = false;
let isOperateSelf = false;


const containClass = (e, className) => {
    return e.target.classList.contains(className);
}

const cleanUpValues = () => {
    a = '';
    operator = '';
    b = '';
    result = undefined;
    currentInput = '';
    displayValue = '';
    isResult = false;
    isOperateSelf = false;
}

const instantOperate = () => {
    result = operate(a, operator, b);
    a = result;
    if (!isOperateSelf) {
        b = "";
    }
    isResult = true;
}

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");

container.addEventListener("click", event => {
    if (containClass(event, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(event, "number-button")) {
        if (currentInput === ''){
            if (isResult) {
                cleanUpValues();
            }
            currentInput = "a";
        }
        if (currentInput === '' || currentInput === "a") {
            a += event.target.dataset.number;
            displayValue = a;
        } else if (currentInput === "b") {
            b += event.target.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }

    if (containClass(event, "arithmetic-button")) {
        if (currentInput === "" && event.target.dataset.arithmetic === "-" && !isResult) {
            a = event.target.dataset.arithmetic;
            displayValue = a;
        }

        if (currentInput === "") {
            if (isResult) {   
                currentInput = "b";
            }
        }
        
        if (currentInput === "a") {
            currentInput = "b";
        }
        // Pressing arithmetic button right after a calculation
        if (currentInput === "b" && b !== '') {
            instantOperate();
        }

        // the operator is only valid after a valid number a
        if (a !== '' && a !== '-') {
            operator = event.target.dataset.arithmetic;
            displayedOperator = event.target.innerText;        
            displayValue = `${a} ${displayedOperator} `;
        }
    }

    if (containClass(event, "operate-button")) {
        // if (isResult) {
        //     a = result;
        // }
        instantOperate();
        currentInput = '';
        displayValue = result;

    }
    displayContent.innerText = displayValue;
    // console.log("a:", a);
    // console.log("operator: ", operator);
    console.log("b: ", b);
    // console.log("result: ", result);
    // console.log("phrase: ", currentInput);
    // console.log("isResult? ", isResult);
})