function checkKey(event) {
  let key = event.target;

  if (isNaN(key.textContent)) {
    if (key.textContent === '=') {
      runOperations();
    } else if (key.textContent === 'C') {
      clearAll();
    } else {
      opKey(key);
    }
  } else {
    valueKey(key);
  }
}

function clearAll() {
  numberBuffer = '';
  operationBuffer = [];
  updateDisplay();
}

function runOperations() {
  operationBuffer.push(numberBuffer);
  
  if (operationBuffer.length >= 3) {
    let total = +operationBuffer.shift();
    
    while (operationBuffer.length >= 2) {
      let operation = getOpFunc(operationBuffer.shift());
      let value = +operationBuffer.shift();
      
      total = operation(total, value);
    }
    
    numberBuffer = total;
    updateDisplay();
  }
}

function getOpFunc(operation) {
  switch (operation) {
    case '+':
      return function(arg1, arg2) {
        return arg1 + arg2;
      };

    case '-':
      return function(arg1, arg2) {
        return arg1 - arg2;
      };

    case '*':
      return function(arg1, arg2) {
        return arg1 * arg2;
      }

    case '/':
      return function(arg1, arg2) {
        return arg1 / arg2;
      }
  }
}

function updateDisplay() {
  currentOperations.textContent = numberBuffer;
  previousOperations.textContent = operationBuffer.join('');
}

function opKey(key) {
  if (numberBuffer) {
    operationBuffer.push(numberBuffer);
    operationBuffer.push(key.textContent);
    numberBuffer = '';

    updateDisplay();
  }
}

function valueKey(key) {
  numberBuffer += key.textContent;

  updateDisplay();
}

let currentOperations = document.querySelector('.current-operands');
let previousOperations = document.querySelector('.previous-operands');
let numberBuffer = '';
let operationBuffer = [];

document
  .querySelectorAll('.key')
  .forEach(
    (key) => key.addEventListener('click', checkKey)
  );