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
  // Set global variables operandA, operandB, and operator
  // according to calc input
  const operands = [];

  if (textDisplay.match(/[+\-*\/]/) !== null) {
    operatorSymbol = textDisplay.match(/[+\-*\/]/)[0];
    operator = { "+": add, "-": subtract, "*": multiply, "/": divide }[operatorSymbol];
    operands.push(...textDisplay.split(operatorSymbol));
  } else {
    operands.push(textDisplay);
  }

  console.log(operands);
  for (let i in operands) {
    operands[i] = +operands[i];
  }
  console.log(operands);

  operandA = operands[0];
  if (operands.length > 1) {
    operandB = operands[1];
  }
}

// Screen display
const dispInput = document.querySelector(".display-input");
const dispResult = document.querySelector(".display-result");

// Operation variables
let operandA;
let operandB;
let operator;
let result;

// Buttons
const btnEqual = document.querySelector(".operator-func.equal");
btnEqual.addEventListener("click", () => {
  decodeInput(dispInput.textContent);
  if (operator === undefined) {
    result = operandA;
  } else {
    result = operate(operandA, operandB, operator);
  }
  dispResult.textContent = result;
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
