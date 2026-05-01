let n1 = 0;
let op = null;
let n2 = null;
const clear = document.querySelector(".clear");
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

function operate() {
  if (op === "+") {
    n1 = add(n1, n2);
  } else if (op === "−") {
    n1 = subtract(n1, n2);
  } else if (op === "×") {
    n1 = multiply(n1, n2);
  } else if (n1 === 0 && n2 === 0) {
    alert("Indeterminate");
  } else if (n2 === 0) {
    alert("Undefined");
  } else {
    n1 = divide(n1, n2);
  }
  op = null;
  n2 = null;
}

function updateNumberVars(n) {
  if (op === null) {
    n1 = +(n1 + n);
  } else {
    n2 = n2 === null ? +n : +(n2 + n);
  }
}

function updateDisplay() {
  display.textContent = `${n1}${op !== null ? ` ${op}` : ""}${n2 !== null ? ` ${n2}` : ""}`;
}

for (const digit of digits) {
  digit.addEventListener("click", () => {
    updateNumberVars(digit.textContent);
    updateDisplay();
  });
}

for (const operator of operators) {
  operator.addEventListener("click", () => {
    if (n2 !== null) {
      operate();
    }
    if (operator.textContent !== "=") {
      op = operator.textContent;
    }
    updateDisplay();
  });
}

clear.addEventListener("click", () => {
  n1 = 0;
  op = null;
  n2 = null;
  updateDisplay();
});
