let currentValue = "";
let calculation = "";
let op = "";
let equalPressed = false;

function updateDisplay(calculated) {
  let display = document.querySelector(".display");

  if (currentValue == "") {
    display.textContent = "";
    return;
  }

  if (currentValue.slice(-1) == ".") {
    display.textContent = currentValue;
    return;
  }

  if (currentValue.indexOf("e") != -1) {
    let toDisplay = currentValue.slice(0, 5);
    let exponentPrefix = currentValue.indexOf("e+");
    let exponent = currentValue.slice(exponentPrefix + 2);
    display.textContent = toDisplay + `e+${exponent}`;
    return;
  }

  if (currentValue.indexOf(".") == -1 && currentValue.length > 10) {
    let firstFive = currentValue.slice(0, 5);
    const toDisplay = Math.round(parseFloat(firstFive) * 10000) / 10000 / 10000;
    display.textContent = toDisplay + `e+${currentValue.length - 1}`;
    return;
  }

  if (calculated) {
    display.textContent = Math.round(parseFloat(currentValue) * 10000) / 10000;
  } else {
    display.textContent = currentValue;
  }

  console.log(calculation);
  console.log(currentValue);
}

function clearDisplay() {
  currentValue = "";
  calculation = "";
  op = "";
  equalPressed = false;
  updateDisplay();
}

function backspaceDisplay() {
  if (currentValue.length <= 0) {
    return;
  }

  currentValue = currentValue.slice(0, -1);
  updateDisplay();
}

function plusMinusDisplay() {
  if (currentValue == "") {
    return;
  } else if (currentValue.charAt(0) == "-") {
    currentValue = currentValue.slice(1);
  } else {
    currentValue = "-" + currentValue;
  }
  updateDisplay();
}

function dotDisplay() {
  if (currentValue.indexOf(".") != -1) {
    return;
  } else if (currentValue == "") {
    currentValue = "0";
  }
  dotPressed = true;
  currentValue += ".";
  updateDisplay();
}

function registerNumber(e) {
  if (equalPressed) {
    currentValue = "";
    equalPressed = false;
  } else if (currentValue.length > 9) {
    return;
  }
  currentValue += e.target.textContent;
  updateDisplay();
}

function registerBinaryOperator(e) {
  if (op != "") {
    calculate();
  }
  calculation = currentValue;
  op = e.target.textContent;
  updateDisplay(true);
  currentValue = "";
}

function equalOperator() {
  if (equalPressed || op == "") {
    return;
  }
  equalPressed = true;
  calculate();
  op = "";
}

function calculate() {
  let calculationTemp = Number(calculation);
  let currentValueTemp = Number(currentValue);
  if (op == "+") {
    currentValueTemp = calculationTemp + currentValueTemp;
  } else if (op == "-") {
    currentValueTemp = calculationTemp - currentValueTemp;
  } else if (op == "*") {
    currentValueTemp = calculationTemp * currentValueTemp;
  } else if (op == "/") {
    currentValueTemp = calculationTemp / currentValueTemp;
  } else {
    console.log("Error");
  }
  currentValue = currentValueTemp.toString();
  calculation = "";
  updateDisplay(true);
}

function addListeners() {
  let numbers = document.querySelectorAll(".number");
  let operators = document.querySelectorAll(".operator");
  let equal = document.querySelector(".equal");
  let clear = document.querySelector(".clear");
  let backspace = document.querySelector(".backspace");
  let plusMinus = document.querySelector(".plus-minus");
  let dot = document.querySelector(".dot");

  numbers.forEach((number) => {
    number.addEventListener("click", registerNumber);
  });
  operators.forEach((operator) => {
    operator.addEventListener("click", registerBinaryOperator);
  });
  equal.addEventListener("click", equalOperator);
  clear.addEventListener("click", clearDisplay);
  backspace.addEventListener("click", backspaceDisplay);
  plusMinus.addEventListener("click", plusMinusDisplay);
  dot.addEventListener("click", dotDisplay);
}

function init() {
  addListeners();
}

init();
