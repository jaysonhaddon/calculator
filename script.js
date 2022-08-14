const currentDisplay = document.querySelector(".current-display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".op-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const evaluateBtn = document.querySelector(".eval-btn");
const maxCharacters = 9;
let nxtNumClear = false;
let canOperate = false;

let currentData = {
  firstValue: "",
  secondValue: "",
  operator: "",
};

numBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (nxtNumClear) {
      clearDisplay();
      addToDisplay(button.value);
      nxtNumClear = false;
    } else {
      addToDisplay(button.value);
    }
  });
});

operatorBtns.forEach((button) => {
  button.addEventListener("click", (e) => {
    console.log("Operator clicked!");
    storeOperationData(e);
    canOperate = operationCheck();
    console.log(canOperate);
  });
});

evaluateBtn.addEventListener("click", () => {
  if (canOperate) {
    let result = operate(
      currentData.operator,
      currentData.firstValue,
      currentData.secondValue
    );
    resultDisplay(result);
  }
});

clearBtn.addEventListener("click", resetData);

deleteBtn.addEventListener("click", deleteFromDisplay);

function addToDisplay(value) {
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

function deleteFromDisplay() {
  let currentValue = currentDisplay.textContent;
  let newValue = currentValue.slice(0, -1);
  if (newValue == "") {
    newValue = "0";
  }
  currentDisplay.textContent = newValue;
}

function clearDisplay() {
  currentDisplay.textContent = "";
}

function resetData() {
  currentDisplay.textContent = "0";
  currentData.firstValue = "";
  currentData.secondValue = "";
  currentData.operator = "";
}

function resultDisplay(result) {
  currentDisplay.textContent = result;
}

function storeOperationData(event) {
  if (currentData.firstValue === "") {
    currentData.firstValue = currentDisplay.textContent;
    currentData.operator = event.target.value;
    console.log("First Number: " + currentData.firstValue);
    console.log("Operator: " + currentData.operator);
  } else {
    currentData.secondValue = currentDisplay.textContent;
    console.log("Second Number: " + currentData.secondValue);
  }
  nxtNumClear = true;
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
  return result.toString();
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
  return num1 / num2;
}
