// Operator functions
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
  return a / b;
}

function operate(a, b, operator) {
  return operator(a, b);
}

// Display function
function writeInput(char) {
  dispInput.textContent += char;
}

function decodeInput(textDisplay) {
  const operands = [];

  if (textDisplay.match(/[+\-*\/]/) !== null) {
    operator = textDisplay.match(/[+\-*\/]/)[0];
    operands.push(...textDisplay.split(operator));
  } else {
    operands.push(textDisplay);
  }

  operandA = operands[0];
  if (operands.length > 1) {
    operandB = operands[1];
  }
}

// Screen display
const dispInput = document.querySelector(".display-input");
const dispResult = document.querySelector(".display-input");

// Operand variables
let operandA;
let operandB;
let operator;

// Buttons
const btnEqual = document.querySelector(".operator-func.equal");
btnEqual.addEventListener("click", () => {
  decodeInput(dispInput.textContent);
});

const btnsDigit = document.querySelectorAll(".digit");
for (const btnDigit of btnsDigit) {
  btnDigit.addEventListener("click", () => {
    dispInput.textContent += btnDigit.value;
  });
}

const btnsOperator = document.querySelectorAll(".operator");
for (const btnOperator of btnsOperator) {
  btnOperator.addEventListener("click", () => {
    dispInput.textContent += btnOperator.value;
  });
}
