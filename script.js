let currentValue = "";
let calculation = "";
let op = "";
let equalPressed = false;
let operators = ["Backspace", ".", "Control", "=", "+", "-", "*", "/", "~"];
let commandPressed = false;

function updateDisplay(calculated) {
  let display = document.querySelector(".display");

  if (currentValue == "Infinity") {
    display.textContent = "Stack Overflow...";
    return;
  }

  if (currentValue == "-") {
    currentValue = "";
  }

  if (currentValue == "") {
    display.textContent = "0";
    return;
  }

  if (currentValue.slice(-1) == ".") {
    display.textContent = currentValue;
    return;
  }

  if (currentValue.indexOf("e-") != -1) {
    let toDisplay = currentValue.slice(0, 5);
    let exponentPrefix = currentValue.indexOf("e-");
    let exponent = currentValue.slice(exponentPrefix + 2);
    display.textContent = toDisplay + `e-${exponent}`;
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

function registerNumber(num) {
  if (equalPressed) {
    currentValue = "";
    equalPressed = false;
  } else if (currentValue.length > 9) {
    return;
  }

  currentValue += num;
  updateDisplay();
}

function registerNumberClicking(e) {
  registerNumber(e.target.textContent);
}

function registerNumberTyping(e) {
  if (e.key < "0" || e.key > "9") {
    return;
  }

  registerNumber(e.key);
}

function removeOperatorsBoxShadow() {
  const operators = document.querySelectorAll(".operator");
  operators.forEach((operator) => (operator.style["box-shadow"] = ""));
}

function registerBinaryOperator(input) {
  const opStyle = document.querySelector(`.${input}`);
  if (currentValue == "") {
    if (op != "") {
      op = input;
      removeOperatorsBoxShadow();
      opStyle.style["box-shadow"] = "0 0 3px 3px white";
    }
    return;
  }

  if (op != "") {
    calculate();
  }

  calculation = currentValue;
  op = input;
  updateDisplay(true);
  removeOperatorsBoxShadow();
  opStyle.style["box-shadow"] = "0 0 3px 3px white";
  currentValue = "";
}

function binaryClicked(e) {
  registerBinaryOperator(e.target.name);
}

function equalOperator() {
  if (equalPressed || op == "") {
    return;
  }
  equalPressed = true;
  calculate();
  op = "";
}

function handleOperatorsTyping(e) {
  if (!operators.includes(e.key)) {
    return;
  }

  if (e.key == "Backspace") {
    if (commandPressed) {
      clearDisplay();
    } else {
      backspaceDisplay();
    }
  } else if (e.key == ".") {
    dotDisplay();
  } else if (e.key == "=") {
    equalOperator();
  } else if (e.key == "*") {
    registerBinaryOperator("multiply");
  } else if (e.key == "+") {
    registerBinaryOperator("plus");
  } else if (e.key == "-") {
    registerBinaryOperator("minus");
  } else if (e.key == "/") {
    registerBinaryOperator("divide");
  } else if (e.key == "Control") {
    commandPressed = false;
  } else if (e.key == "~") {
    plusMinusDisplay();
  }
}

function handleACTyping(e) {
  if (e.key == "Control") {
    commandPressed = true;
  }
}

function calculate() {
  let calculationTemp = Number(calculation);
  let currentValueTemp = Number(currentValue);
  if (op == "plus") {
    currentValueTemp = calculationTemp + currentValueTemp;
  } else if (op == "minus") {
    currentValueTemp = calculationTemp - currentValueTemp;
  } else if (op == "multiply") {
    currentValueTemp = calculationTemp * currentValueTemp;
  } else if (op == "divide") {
    currentValueTemp = calculationTemp / currentValueTemp;
  } else {
    console.log("Error");
  }
  currentValue = currentValueTemp.toString();
  calculation = "";
  removeOperatorsBoxShadow();
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
    number.addEventListener("click", registerNumberClicking);
  });
  operators.forEach((operator) => {
    operator.addEventListener("click", binaryClicked);
  });
  equal.addEventListener("click", equalOperator);
  clear.addEventListener("click", clearDisplay);
  backspace.addEventListener("click", backspaceDisplay);
  plusMinus.addEventListener("click", plusMinusDisplay);
  dot.addEventListener("click", dotDisplay);
  document.addEventListener("keyup", registerNumberTyping);
  document.addEventListener("keyup", handleOperatorsTyping);
  document.addEventListener("keydown", handleACTyping);
}

function init() {
  addListeners();
  updateDisplay();
}

init();
