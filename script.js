let n1;
let op;
let n2;

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
  } else if (op === "-") {
    return subtract(n1, n2);
  } else if (op === "x") {
    return multiply(n1, n2);
  } else {
    return divide(n1, n2);
  }
}
