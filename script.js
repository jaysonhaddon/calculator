const currentDisplay = document.querySelector(".current-display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".op-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const evaluateBtn = document.querySelector(".eval-btn");
const maxCharacters = 9;
let nxtNumClear = false;
let canOperate = false;
let errorState = false;

let currentData = {
  firstValue: "",
  secondValue: "",
  operator: "",
};

numBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (errorState) return;
    if (nxtNumClear) {
      clearDisplay();
      addNumToDisplay(button.value);
      nxtNumClear = false;
    } else {
      addNumToDisplay(button.value);
    }
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    if (errorState) return;

    storeNumberData();
    storeOperatorData(e);
  });
});

evaluateBtn.addEventListener("click", () => {
  storeNumberData();
  canOperate = operationCheck();
  if (canOperate) {
    let result = operate(
      currentData.operator,
      currentData.firstValue,
      currentData.secondValue
    );
    resultDisplay(result);
    resetOperationData(result);
    canOperate = false;
  }
});

decimalBtn.addEventListener("click", (e) => {
  addDecimalToDisplay(e);
});

clearBtn.addEventListener("click", resetState);

deleteBtn.addEventListener("click", () => {
  if (errorState) return;
  deleteFromDisplay();
});

function addNumToDisplay(value) {
  let currentValue = currentDisplay.textContent;
  if (currentValue.length >= maxCharacters) {
    return;
  }

  if (currentValue == 0) {
    currentDisplay.textContent = value;
  } else {
    currentDisplay.textContent += value;
  }
}

function addDecimalToDisplay(e) {
  let currentValue = currentDisplay.textContent;
  let value = e.target.value;
  if (currentValue.includes(value)) {
    return;
  } else if (currentValue === "0") {
    return;
  } else {
    currentDisplay.textContent += value;
  }
}

function deleteFromDisplay() {
  let currentValue = currentDisplay.textContent;
  let newValue = currentValue.slice(0, -1);
  console.log(newValue);
  if (newValue == "") {
    newValue = "0";
  } else if (newValue.length == 2 && newValue[1] == ".") {
    newValue = newValue[0];
  }
  currentDisplay.textContent = newValue;
}

function clearDisplay() {
  currentDisplay.textContent = "";
}

function resetState() {
  let result = "";
  currentDisplay.textContent = "0";
  errorState = false;
  resetOperationData(result);
}

function resultDisplay(result) {
  currentDisplay.textContent = result;
}

function storeNumberData() {
  if (currentData.firstValue === "") {
    currentData.firstValue = currentDisplay.textContent;
  } else {
    currentData.secondValue = currentDisplay.textContent;
  }

  nxtNumClear = true;
  console.log("Num1: " + currentData.firstValue);
  console.log("Num2: " + currentData.secondValue);
}

function storeOperatorData(event) {
  if (currentData.operator === "") currentData.operator = event.target.value;
  console.log("Operation: " + currentData.operator);
}

function operationCheck() {
  return currentData.firstValue !== "" && currentData.secondValue !== ""
    ? true
    : false;
}

function operate(operator, num1, num2) {
  let result;
  num1 = Number(num1);
  num2 = Number(num2);
  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }
  result = result.toString();
  if (result.length > maxCharacters) {
    errorState = true;
    return "ERROR";
  } else {
    return result;
  }
}

function resetOperationData(result) {
  currentData.firstValue = result;
  currentData.secondValue = "";
  currentData.operator = "";
  console.log(currentData);
}

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  if (num2 === 0) {
    errorState = true;
    return "ERROR";
  } else {
    return (num1 / num2).toFixed(1);
  }
}
