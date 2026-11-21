// DOM elements used by the calculator
const buttonsContainer = document.getElementById("buttons");
const expressionElement = document.getElementById("expression");
const resultElement = document.getElementById("result");

// Calculator state
let currentInput = "0";
let previousInput = "";
let operator = null;
let shouldResetInput = false;
let hasError = false;

// Maximum digits allowed in one entered number
const MAX_DIGITS = 12;

const DIVISION_BY_ZERO_MESSAGE = "Cannot divide by 0";

// Keyboard keys mapped to the symbols shown on the buttons
const KEY_TO_OPERATOR = {
  "+": "+",
  "-": "−",
  "*": "×",
  "/": "÷"
};

// Write the current state to the display
function updateDisplay() {
  expressionElement.textContent =
    operator && previousInput !== "" ? `${previousInput} ${operator}` : "";
  resultElement.textContent = currentInput;
}

// Count digits only, ignoring the minus sign and decimal point
function getDigitCount(value) {
  return value.replace(/[-.]/g, "").length;
}

// Keep results readable and remove small floating-point rounding errors
function formatNumber(value) {
  if (!Number.isFinite(value)) {
    return null;
  }

  return String(Number(value.toPrecision(12)));
}

// Reset every part of the calculator
function resetCalculator() {
  currentInput = "0";
  previousInput = "";
  operator = null;
  shouldResetInput = false;
  hasError = false;
  updateDisplay();
}

// Show a friendly error message and wait for the user to start again
function showError(message) {
  currentInput = message;
  previousInput = "";
  operator = null;
  shouldResetInput = false;
  hasError = true;
  updateDisplay();
}

// Add a digit to the current number
function handleNumber(number) {
  if (hasError) {
    resetCalculator();
  }

  if (shouldResetInput || currentInput === "0") {
    currentInput = number;
    shouldResetInput = false;
  } else if (getDigitCount(currentInput) < MAX_DIGITS) {
    currentInput += number;
  }

  updateDisplay();
}

// Add a decimal point only when the current number does not have one
function handleDecimal() {
  if (hasError) {
    resetCalculator();
  }

  if (shouldResetInput) {
    currentInput = "0.";
    shouldResetInput = false;
  } else if (!currentInput.includes(".")) {
    currentInput += ".";
  }

  updateDisplay();
}

// Perform the selected operation without using eval()
function calculateResult() {
  if (hasError || !operator) {
    return;
  }

  const firstNumber = Number(previousInput);
  const secondNumber = Number(currentInput);
  let result;

  switch (operator) {
    case "+":
      result = firstNumber + secondNumber;
      break;
    case "−":
      result = firstNumber - secondNumber;
      break;
    case "×":
      result = firstNumber * secondNumber;
      break;
    case "÷":
      if (secondNumber === 0) {
        showError(DIVISION_BY_ZERO_MESSAGE);
        return;
      }
      result = firstNumber / secondNumber;
      break;
    default:
      return;
  }

  const formattedResult = formatNumber(result);

  if (formattedResult === null) {
    showError("Number is too large");
    return;
  }

  currentInput = formattedResult;
  previousInput = "";
  operator = null;
  shouldResetInput = true;
  updateDisplay();
}

// Store the operator, or calculate first when chaining operations
function handleOperator(nextOperator) {
  if (hasError) {
    resetCalculator();
    return;
  }

  if (operator && !shouldResetInput) {
    calculateResult();

    if (hasError) {
      return;
    }
  }

  previousInput = currentInput;
  operator = nextOperator;
  shouldResetInput = true;
  updateDisplay();
}

// One click listener handles all buttons
buttonsContainer.addEventListener("click", function (event) {
  const button = event.target.closest("button");

  if (!button) {
    return;
  }

  const action = button.dataset.action;
  const value = button.dataset.value;

  if (action === "number") {
    handleNumber(value);
  } else if (action === "decimal") {
    handleDecimal();
  } else if (action === "operator") {
    handleOperator(value);
  } else if (action === "equals") {
    calculateResult();
  } else if (action === "clear") {
    resetCalculator();
  }
});

// Optional keyboard support: numbers, operators, Enter/=, Escape/C
document.addEventListener("keydown", function (event) {
  const key = event.key;
  const focusedTag = document.activeElement.tagName;

  // Let the browser activate a focused button with Enter or Space
  if (focusedTag === "BUTTON" && (key === "Enter" || key === " ")) {
    return;
  }

  if (/^\d$/.test(key)) {
    handleNumber(key);
  } else if (key === ".") {
    handleDecimal();
  } else if (Object.prototype.hasOwnProperty.call(KEY_TO_OPERATOR, key)) {
    event.preventDefault();
    handleOperator(KEY_TO_OPERATOR[key]);
  } else if (key === "Enter" || key === "=") {
    event.preventDefault();
    calculateResult();
  } else if (key === "Escape" || key.toLowerCase() === "c") {
    resetCalculator();
  }
});

// Show the initial value
updateDisplay();
