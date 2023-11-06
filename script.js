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
  return roundIfLong(operator(a, b), 3);
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

  for (let i in operands) {
    if (operands[i] === "") {
      operands[i] = undefined;
    } else {
      operands[i] = +operands[i];
    }
  }

  operandA = operands[0];
  if (operands.length > 1) {
    operandB = operands[1];
  }
}

function clearCurrent(textDisplay) {
  let messageParts = [];

  if (textDisplay.match(/[+\-*\/]/) !== null) {
    operatorSymbol = textDisplay.match(/[+\-*\/]/)[0];
    messageParts = textDisplay.split(operatorSymbol);
    messageParts.pop();

    // Checks if last character is NOT an operator.
    if (!"+-*/".includes(textDisplay.slice(-1))) {
      messageParts.push(operatorSymbol);
    }
  }

  return messageParts.join("");
}

// Helper functions
function isFinalCharOperator(text) {
  const finalChar = text.slice(-1);
  return "+-*/".includes(finalChar);
}

function replaceFinalChar(text, r) {
  return text.slice(0, -1) + r;
}

function areOperandsValid() {
  return operandA !== undefined && operandB !== undefined;
}

function countOccurrences(str, char) {
  let count = 0;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === char) {
      count++;
    }
  }
  return count;
}

function checkIfIn(myString, substrings) {
  for (let substring of substrings) {
    if (myString.includes(substring)) {
      return true;
    }
  }
  return false;
}

function roundIfLong(num, maxDecimals) {
  const numDecimals = num.toString().split(".")[1];
  if (numDecimals && numDecimals.length > maxDecimals) {
    return num.toFixed(maxDecimals);
  }
  return num;
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

const btnDecimalPoint = document.querySelector(".decimal-point");
btnDecimalPoint.addEventListener("click", () => {
  let lastChar = dispInput.textContent.slice(-1);
  if (lastChar !== ".") {
    if (countOccurrences(dispInput.textContent, ".") < 1) {
      dispInput.textContent += btnDecimalPoint.value;
    } else if (
      countOccurrences(dispInput.textContent, ".") < 2 &&
      checkIfIn(dispInput.textContent, ["+", "-", "*", "/"])
    ) {
      dispInput.textContent += btnDecimalPoint.value;
    }
  }
});

const btnsOperator = document.querySelectorAll(".operator");
for (const btn of btnsOperator) {
  btn.addEventListener("click", () => {
    let currentText = dispInput.textContent;

    if (isFinalCharOperator(currentText)) {
      dispInput.textContent = replaceFinalChar(currentText, btn.value);
    } else {
      decodeInput(dispInput.textContent);
      dispInput.textContent += btn.value;
    }

    if (areOperandsValid()) {
      let result = operate(operandA, operandB, operator);
      dispInput.textContent = `${result}${btn.value}`;
      dispResult.textContent = result;
    }
  });
}

const btnAllClear = document.querySelector(".all-clear");
btnAllClear.addEventListener("click", () => {
  dispInput.textContent = "";
  dispResult.textContent = "";
  operandA = undefined;
  operandB = undefined;
});

const btnClear = document.querySelector(".clear-current");
btnClear.addEventListener("click", () => {
  dispInput.textContent = clearCurrent(dispInput.textContent);
});
