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

const operations = {
  "+": add,
  "−": subtract,
  "×": multiply,
  "÷": divide,
};

function operate() {
  if (op === "÷" && +n2 === 0) {
    alert(+n1 === 0 ? "Indeterminate" : "Undefined");
  } else {
    n1 = operations[op](+n1, +n2).toString();
  }
  op = "";
  n2 = "";
}

function updateNumberVars(n) {
  if (resultDisplayed) {
    if (n === ".") {
      n1 = "0.";
    } else {
      n1 = n;
    }
    resultDisplayed = false;
  } else if (op === "") {
    if (n === "." && n1.includes(".")) {
      return;
    }
    if (n === "0" && n1 === "0") {
      return;
    }
    if (n !== "." && n1 === "0") {
      n1 = n;
      return;
    }
    n1 += n;
  } else {
    if (n === "." && n2.includes(".")) {
      return;
    }
    if (n === "0" && n2 === "0") {
      return;
    }
    if (n === "." && n2 === "") {
      n2 = "0.";
    } else if (n2 === "0" && n !== ".") {
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

const buttonForKey = {};
for (const digit of digits) {
  buttonForKey[digit.textContent] = digit;
}
const operatorByText = {};
for (const operator of operators) {
  operatorByText[operator.textContent] = operator;
}
Object.assign(buttonForKey, {
  "+": operatorByText["+"],
  "-": operatorByText["−"],
  "*": operatorByText["×"],
  x: operatorByText["×"],
  X: operatorByText["×"],
  "/": operatorByText["÷"],
  "=": operatorByText["="],
  Enter: operatorByText["="],
  Escape: clear,
  Backspace: backspace,
});

document.addEventListener("keydown", (e) => {
  buttonForKey[e.key]?.click();
});

document.querySelector(".year").textContent = new Date().getFullYear();
