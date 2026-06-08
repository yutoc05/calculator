let n1, op, n2, resultDisplayed;

function reset() {
  n1 = "0";
  op = "";
  n2 = "";
  resultDisplayed = false;
}

reset();

const buttons = document.querySelectorAll(".buttons button");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".backspace");
const digits = document.querySelectorAll(".digit");
const operators = document.querySelectorAll(".operator");
const display = document.querySelector(".display");

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

const SYMBOLS = {
  add: "+",
  subtract: "−",
  multiply: "×",
  divide: "÷",
  equals: "=",
};

const operations = {
  [SYMBOLS.add]: add,
  [SYMBOLS.subtract]: subtract,
  [SYMBOLS.multiply]: multiply,
  [SYMBOLS.divide]: divide,
};

function operate() {
  if (op === SYMBOLS.divide && +n2 === 0) {
    alert(+n1 === 0 ? "Indeterminate" : "Undefined");
  } else {
    n1 = operations[op](+n1, +n2).toString();
  }
  op = "";
  n2 = "";
}

function appendDigit(current, n) {
  if (n === "." && current.includes(".")) return current;
  if (n === "." && (current === "" || current === "0")) return "0.";
  if (current === "0") return n === "0" ? "0" : n;
  return current + n;
}

function updateNumberVars(n) {
  if (resultDisplayed) {
    n1 = n === "." ? "0." : n;
    resultDisplayed = false;
  } else if (op === "") {
    n1 = appendDigit(n1, n);
  } else {
    n2 = appendDigit(n2, n);
  }
}

function updateDisplay() {
  display.textContent = [n1, op, n2].filter(Boolean).join(" ");
}

for (const button of buttons) {
  button.addEventListener("click", () => button.blur());
}

for (const digit of digits) {
  digit.addEventListener("click", () => {
    updateNumberVars(digit.textContent);
    updateDisplay();
  });
}

for (const operator of operators) {
  operator.addEventListener("click", () => {
    if (n2 !== "") {
      operate();
      resultDisplayed = true;
    }
    if (operator.textContent !== "=") {
      op = operator.textContent;
      resultDisplayed = false;
    }
    updateDisplay();
  });
}

clear.addEventListener("click", () => {
  reset();
  updateDisplay();
});

backspace.addEventListener("click", () => {
  resultDisplayed = false;
  if (n2 !== "") {
    n2 = n2.slice(0, -1);
  } else if (op !== "") {
    op = op.slice(0, -1);
  } else if (n1.length === 1) {
    n1 = "0";
  } else {
    n1 = n1.slice(0, -1);
  }
  updateDisplay();
});

const buttonForKey = Object.fromEntries(
  [...digits].map((digit) => [digit.textContent, digit])
);
const operatorByText = Object.fromEntries(
  [...operators].map((operator) => [operator.textContent, operator])
);
Object.assign(buttonForKey, {
  "+": operatorByText[SYMBOLS.add],
  "-": operatorByText[SYMBOLS.subtract],
  "*": operatorByText[SYMBOLS.multiply],
  x: operatorByText[SYMBOLS.multiply],
  X: operatorByText[SYMBOLS.multiply],
  "/": operatorByText[SYMBOLS.divide],
  "=": operatorByText[SYMBOLS.equals],
  Enter: operatorByText[SYMBOLS.equals],
  Escape: clear,
  Backspace: backspace,
});

document.addEventListener("keydown", (e) => {
  buttonForKey[e.key]?.click();
});

document.querySelector(".year").textContent = new Date().getFullYear();
