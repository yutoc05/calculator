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

backspace.addEventListener("click", () => {
  resultDisplayed = false;
  if (n2 !== "") {
    n2 = n2.slice(0, -1);
    n2HasDecimal = n2.includes(".");
  } else if (op !== "") {
    op = op.slice(0, -1);
  } else if (n1.length === 1) {
    n1 = "0";
  } else {
    n1 = n1.slice(0, -1);
    n1HasDecimal = n1.includes(".");
  }
  updateDisplay();
});

document.addEventListener("keydown", (e) => {
  if (e.key === "1") digits[6].click();
  if (e.key === "2") digits[7].click();
  if (e.key === "3") digits[8].click();
  if (e.key === "4") digits[3].click();
  if (e.key === "5") digits[4].click();
  if (e.key === "6") digits[5].click();
  if (e.key === "7") digits[0].click();
  if (e.key === "8") digits[1].click();
  if (e.key === "9") digits[2].click();
  if (e.key === "0") digits[10].click();
  if (e.key === ".") digits[9].click();
  if (e.key === "+") operators[4].click();
  if (e.key === "-") operators[2].click();
  if (e.key === "*" || e.key === "x" || e.key === "X") operators[1].click();
  if (e.key === "/") operators[0].click();
  if (e.key === "=" || e.key === "Enter") operators[3].click();
  if (e.key === "Escape") clear.click();
  if (e.key === "Backspace") backspace.click();
});
