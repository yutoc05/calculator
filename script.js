let n1 = 0;
let op = null;
let n2 = null;
const digits = document.querySelectorAll(".digit");
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

function operate(op, n1, n2) {
  if (op === "+") {
    return add(n1, n2);
  } else if (op === "−") {
    return subtract(n1, n2);
  } else if (op === "×") {
    return multiply(n1, n2);
  } else {
    return divide(n1, n2);
  }
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
