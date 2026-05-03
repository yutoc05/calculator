let n1 = "0";
let op = "";
let n2 = "";
let n1HasDecimal = false;
let n2HasDecimal = false;
let resultDisplayed = false;
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

function operate() {
  if (op === "+") {
    n1 = add(+n1, +n2).toString();
  } else if (op === "−") {
    n1 = subtract(+n1, +n2).toString();
  } else if (op === "×") {
    n1 = multiply(+n1, +n2).toString();
  } else if (n1 == 0 && n2 == 0) {
    alert("Indeterminate");
  } else if (n2 == 0) {
    alert("Undefined");
  } else {
    n1 = divide(+n1, +n2).toString();
  }
  op = "";
  n2 = "";
  n2HasDecimal = false;
  n1HasDecimal = n1.includes(".");
}

function updateNumberVars(n) {
  // start new calculation
  if (resultDisplayed) {
    if (n === ".") {
      n1HasDecimal = true;
      n1 = "0.";
    } else {
      n1 = n;
    }
    resultDisplayed = false;
  } else if (op === "") {
    if (n === "." && n1HasDecimal) {
      return;
    }
    if (n === "0" && n1 === "0") {
      return;
    }
    if (n !== "." && n1 === "0") {
      n1 = n;
      return;
    }
    if (n === ".") {
      n1HasDecimal = true;
    }
    n1 += n;
  } else {
    if (n === "." && n2HasDecimal) {
      return;
    }
    if (n === "0" && n2 === "0") {
      return;
    }
    if (n === "." && n2 === "") {
      n2HasDecimal = true;
      n2 = "0.";
    } else if (n === ".") {
      n2HasDecimal = true;
      n2 += n;
    } else if (n2 === "0") {
      n2 = n;
    } else {
      n2 += n;
    }
  }
}

function updateDisplay() {
  display.textContent = n1;
  display.textContent += op !== "" ? ` ${op}` : "";
  display.textContent += n2 !== "" ? ` ${n2}` : "";
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
  n1 = "0";
  op = "";
  n2 = "";
  n1HasDecimal = false;
  n2HasDecimal = false;
  resultDisplayed = false;
  updateDisplay();
});
