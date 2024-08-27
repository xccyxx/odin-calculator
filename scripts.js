const add = (a, b) => a + b;
const subtract = (a, b) => a - b;
const multiply = (a, b) => a * b;
const divide = (a, b) => a / b;
const operate = (a, operator, b) => add(a, b);

let a = '';
let operator = '';
let b = '';
let displayValue = '';

// const containClass = (targetElement, cls) => {
//     if (targetElement.classList.contains(cls))
//     return targetElement.classList.contains(cls);
// }

let container = document.querySelector(".container"); 
let displayBox = document.querySelector("#displayBox");

container.addEventListener("click", event => {
    let target = event.target
    if (event.target.classList.contains("number-button")) {
        a += target.dataset.number;
        console.log(a);
        displayBox.innerText = a;
    }  
})