const currentDisplay = document.querySelector(".current-display");
const numBtns = document.querySelectorAll(".num-btn");
const operatorBtns = document.querySelectorAll(".op-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const decimalBtn = document.querySelector(".decimal-btn");
const maxCharacters = 9;
let nxtNumClear = false;
let canOperate = false;
let errorState = false;

let currentData = {
  firstValue: "",
  secondValue: "",
  operator: "",
};

window.addEventListener("keydown", (e) => {
  keyPressed = e.key;
  keyButton = document.querySelector(`button[data-key="${keyPressed}"]`);
  if (keyButton != null) {
    keyButton.click();
    keyButton.focus();
  }
});

numBtns.forEach((button) => {
  button.addEventListener("click", () => {
    if (errorState) return;

    if (currentData.operator === "=") {
      resetState();
    }

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
    let newOperator = storeOperatorData(e);
    canOperate = operationCheck();

    if (canOperate) {
      let result = operate(
        currentData.operator,
        currentData.firstValue,
        currentData.secondValue
      );
      resultDisplay(result);
      resetOperationData(result, newOperator);
      canOperate = false;
    }
  });
});

decimalBtn.addEventListener("click", (e) => {
  if (errorState) return;

  if (nxtNumClear) {
    clearDisplay();
    addDecimalToDisplay(e);
    nxtNumClear = false;
  } else {
    addDecimalToDisplay(e);
  }
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

  if (currentValue === "0") {
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
  } else {
    currentDisplay.textContent += value;
  }
}

function deleteFromDisplay() {
  let currentValue = currentDisplay.textContent;
  let newValue = currentValue.slice(0, -1);
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
  let newOperator = "";
  currentDisplay.textContent = "0";
  errorState = false;
  resetOperationData(result, newOperator);
}

function resultDisplay(result) {
  currentDisplay.textContent = result;
}

function storeNumberData() {
  if (currentData.operator !== "=") {
    if (currentData.firstValue === "") {
      currentData.firstValue = currentDisplay.textContent;
    } else {
      currentData.secondValue = currentDisplay.textContent;
    }
  }
  nxtNumClear = true;
}

function storeOperatorData(event) {
  let newOperator = event.target.value;
  if (currentData.operator === "" || currentData.operator === "=")
    currentData.operator = newOperator;

  return newOperator;
}

function operationCheck() {
  return currentData.firstValue !== "" &&
    currentData.secondValue !== "" &&
    currentData.operator !== "="
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

function resetOperationData(result, newOperator) {
  currentData.firstValue = result;
  currentData.secondValue = "";
  currentData.operator = newOperator;
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
    result = num1 / num2;
    if (result.toString().length > maxCharacters) {
      result = result.toFixed(maxCharacters - 2);
    }
    return result;
  }
}
