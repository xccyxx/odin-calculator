const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => {
    a = parseFloat(a);
    b = parseFloat(b);
    let calculatedResult;

    if (Number.isNaN(a) || Number.isNaN(b)) {
        return "Invalid Input";
    }

    // calculation
    switch (operator) {
        case "+":
            calculatedResult = add(a, b);
            break;
        case "-":
            calculatedResult = subtract(a, b);
            break;
        case "*":
            calculatedResult = multiply(a, b);
            break;
        case "/":
            if (b === 0) {
                return "Invalid Input";
            }
            calculatedResult = divide(a, b);
            break;
    }

    return Math.round(calculatedResult * 1000) / 1000;
};

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
    decimalButton.disabled = false;
}

const displayResult = (inputContext) => {
    if (inputContext === "a") {
        return a;
    }
    if (inputContext === "b") {
        return `${a} ${displayedOperator} ${b}`;
    }
}

const toggleDecimalButton = (str) => {
    if (str.includes(".")) {
        decimalButton.disabled = true;
    } else {
        decimalButton.disabled = false;
    }
}

const undo = (inputContext) => {
    if (inputContext === "a") {
        a = a.slice(0, -1);
        displayValue = displayResult("a");
        toggleDecimalButton(a);
    }
    if (inputContext === "b") {
        if (b == "") {
            operator = "";
            currentInput = "a";
            displayValue = displayResult("a");
            toggleDecimalButton(a);
        } else {
            b = b.slice(0, -1);
            displayValue = displayResult("b");
            toggleDecimalButton(b);
        }
    }
}

const handleInputs = (input) => {
    if (containClass(input, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(input, "backspace-button")) {
        undo(currentInput);
    }

    if (containClass(input, "number-button") || containClass(input, "decimal-button")) {
        if (currentInput === "b" && isResult) {
            cleanUpValues();
            currentInput = "a";
        }

        if (currentInput === "a") {
            if (containClass(input, "decimal-button") && a === "") {
                a = "0";
            }
            a += input.dataset.action;
            displayValue = displayResult("a");
            toggleDecimalButton(a);
        } else {
            if (containClass(input, "decimal-button") && b === "") {
                b = "0";
            }
            b += input.dataset.action;
            displayValue = displayResult("b");
            toggleDecimalButton(b);
        }
    }
    
    if (containClass(input, "arithmetic-button")) {
        // unlock the decimal button at first
        decimalButton.disabled = false;


        if (currentInput === "a") {
            // handle positive sign or negative sign for number a
            if (!isResult && (a === "" || a === "-")) {
                if (input.dataset.action === "+") {
                    a = "";
                }
                if (input.dataset.action === "-") {
                    a = "-";
                }
                displayValue = displayResult("a");
            } else {
                currentInput = "b";
            }
        }

        // Pressing arithmetic button right after a calculation
        if (currentInput === "b" && b !== '') {
            a = operate(a, operator, b);
            b = "";
            isResult = false;
        }

        // the operator is only valid after a valid number a
        if (a !== '' && a !== '-') {
            operator = input.dataset.action;
            displayedOperator = input.innerText;        
            displayValue = displayResult("b");
        }
    }

    if (containClass(input, "operate-button")) {
        // unlock the decimal button at first
        decimalButton.disabled = false;

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
}

let a = '';
let operator = '';
let b = '';
let result;
let displayValue = '';
let displayedOperator = '';
let currentInput = "a";
let isResult = false;

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");
let buttons = document.querySelectorAll(".button");
let decimalButton = document.querySelector(".decimal-button");



document.addEventListener("keydown", event => {
    const keyName = event.key;
    console.log(keyName);
    buttons.forEach(button => {
        let matchNumberButton = keyName === button.dataset.action;
        let matchArithmeticButton = keyName === button.dataset.action;
        let matchOperateButton = button.className.includes("operate-button") && (keyName === "=" || keyName === "Enter");
        let matchClearButton = button.className.includes("clear-button") && (keyName === "Escape" || keyName === "Delete");
        let matchBackspaceButton = button.className.includes("backspace-button") && (keyName === "Backspace");
        if (matchOperateButton || matchNumberButton || matchArithmeticButton || matchClearButton || matchBackspaceButton) {
            button.click();
        }
    })
})

container.addEventListener("click", event => {
    let targetButton = event.target
    console.log(targetButton);
    
    if (containClass(targetButton, "clear-button")) {
        cleanUpValues();
    }

    if (containClass(targetButton, "backspace-button")) {
        undo(currentInput);
    }

    if (containClass(targetButton, "number-button") || containClass(targetButton, "decimal-button")) {
        if (currentInput === "b" && isResult) {
            cleanUpValues();
            currentInput = "a";
        }

        if (currentInput === "a") {
            if (containClass(targetButton, "decimal-button") && a === "") {
                a = "0";
            }
            a += targetButton.dataset.action;
            displayValue = displayResult("a");
            toggleDecimalButton(a);
        } else {
            if (containClass(targetButton, "decimal-button") && b === "") {
                b = "0";
            }
            b += targetButton.dataset.action;
            displayValue = displayResult("b");
            toggleDecimalButton(b);
        }
    }
    

    if (containClass(targetButton, "arithmetic-button")) {
        // unlock the decimal button at first
        decimalButton.disabled = false;


        if (currentInput === "a") {
            // handle positive sign or negative sign for number a
            if (!isResult && (a === "" || a === "-")) {
                if (targetButton.dataset.action === "+") {
                    a = "";
                }
                if (targetButton.dataset.action === "-") {
                    a = "-";
                }
                displayValue = displayResult("a");
            } else {
                currentInput = "b";
            }
        }

        // Pressing arithmetic button right after a calculation
        if (currentInput === "b" && b !== '') {
            a = operate(a, operator, b);
            b = "";
            isResult = false;
        }

        // the operator is only valid after a valid number a
        if (a !== '' && a !== '-') {
            operator = targetButton.dataset.action;
            displayedOperator = targetButton.innerText;        
            displayValue = displayResult("b");
        }
    }

    if (containClass(targetButton, "operate-button")) {
        // unlock the decimal button at first
        decimalButton.disabled = false;

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
    console.log(a);
    // console.log(operator);
    // console.log(b);
    // console.log(displayValue);
})