let firstNumber = '';
let secondNumber = '';
let operand = '';
let previousOperand = '';
let result = '';
let operandState = false;
let equalState = false;

//Functionality buttons;
const numbers = document.querySelectorAll(".number");
const operands = document.querySelectorAll(".operand");
const clear = document.querySelector(".clear");
const backspace = document.querySelector(".delete");
const equals = document.querySelector(".equals");

//Display Elements;
const history = document.querySelector("#input");
const output = document.querySelector("#result");

//Populating the display, storing the variables;
numbers.forEach((number) => {
    number.addEventListener("click", () => {
        
        if (number.value === '.') {

            if (!output.textContent.includes('.') && output.textContent !== '') {
                output.textContent = output.textContent + '.';

            } else if (!output.textContent.includes('.') && output.textContent === '') {
                output.textContent = '0.';

            } else {
                output.textContent += '';
            };
            operandState = false;

        } else {
            
            if (equalState && output.textContent !== ''){
                clearCalc();
                output.textContent += number.value;
                operandState = false;
            
            } else {
                output.textContent += number.value;
                operandState = false;
            };
        };
        operandState = false;
    });
});

//Operation handling.
operands.forEach((operandClicked) => {
    operandClicked.addEventListener("click", () => {

        if (history.textContent === '' && output.textContent === '') {
            history.textContent = '';
            output.textContent = '';
            operand = '';

        } else {
            if (output.textContent !== '' && history.textContent === '') {

                firstNumber = output.textContent;
                operand = operandClicked.value;
                history.textContent = firstNumber + ' ' + operand;
                output.textContent = '';
                previousOperand = operand;
                
            } else if (history !== '' && operandState !== true) {
                //Operand Swap;
                previousOperand = operand;
                operand = operandClicked.value;

                //Number Swap;
                secondNumber = output.textContent;
                result = operate(Number(firstNumber), Number(secondNumber), previousOperand);
                
                //Display Swap;
                history.textContent = result + ' ' + operand;
                firstNumber = result;
                output.textContent = '';
            };
        };

        operandState = true;

    });
});

//Backspace;
backspace.addEventListener("click", () => {
    let text = output.textContent;
    output.textContent = text.slice(0,text.length - 1);
});

//Clear;
clear.addEventListener("click", () => {
    clearCalc();
});

//Equals Trigger;
equals.addEventListener("click", () => {
    secondNumber = output.textContent;
    isEqual(firstNumber, secondNumber, operand)
    equalState = true;
});

//Equals Function;
function isEqual(first, second, operand) {
    clearCalc();
    output.textContent = operate(Number(first), Number(second), operand);
    
};

//Operations;
function add(a, b) {
    return a + b
};

function subtract(a, b) {
    return a - b
};

function multiply(a, b) {
    return a * b
};

function divide(a, b) {
    if (b !== 0) {
        return Number((a / b).toFixed(9));
    } else {
        return "Error : Division by 0"
    }
};

//Evaluation function;
function operate(a, b, operation) {
    
    if (operation === "+") {
        return add(a, b);
    } else if (operation === "-") {
        return subtract(a, b);
    } else if (operation === "*") {
        return multiply(a, b);
    } else if (operation === "/") {
        return divide(a, b);
    };

};

//Clear function;
function clearCalc() {
    firstNumber = '';
    secondNumber = '';
    operand = '';
    previousOperand = '';
    output.textContent = '';
    history.textContent = '';
    equalState = false;
};
