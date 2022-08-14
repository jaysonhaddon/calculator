const currentDisplay = document.querySelector(".current-display");
const numBtns = document.querySelectorAll(".num-btn");
const clearBtn = document.querySelector(".clear-btn");
const deleteBtn = document.querySelector(".delete-btn");
const maxCharacters = 9;

numBtns.forEach((button) => {
  button.addEventListener("click", () => {
    addToDisplay(button.value);
  });
});

clearBtn.addEventListener("click", clearDisplay);

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
  currentDisplay.textContent = "0";
}
