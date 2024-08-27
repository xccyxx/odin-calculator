const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => add(a, b);

let a = '';
let operator = '';
let b = '';
let formula;
let result = 0;
let displayValue = '';
let displayedOperator = '';
let hasNumberA = false;

const containClass = (e, className) => {
    return e.target.classList.contains(className);
}

let container = document.querySelector(".container"); 
let displayContent = document.querySelector(".displayContent");

container.addEventListener("click", event => {
    if (containClass(event, "number-button")) {
        if (!hasNumberA) {
            a += event.target.dataset.number;
            displayValue = a;
        } else {
            b += event.target.dataset.number;
            displayValue = `${a} ${displayedOperator} ${b}`;
        }
    }
    if (containClass(event, "arithmetic-button")) {
        if (a !== '' && b === '') {
            operator = event.target.dataset.arithmetic;
            displayedOperator = event.target.innerText;
            displayValue = `${a} ${displayedOperator} `;
            hasNumberA = true;
        }
    }
    displayContent.innerText = displayValue;
})