// HTML elements
const displayScreen = document.querySelector('.display_calc');
const displayContent = document.querySelector('.display_content');
const displayKeys = document.querySelector('.display_keys');

// Adding event Listner for Keys
displayKeys.addEventListener('click', function (e) {

    // getting buttons as target on click
    const key = e.target;
    const action = key.dataset.action;

    // getting textContent of different elements
    let keyContent = key.textContent;
    let  displayScreenContent = displayContent.textContent;
    let previousKeyType = displayScreen.dataset.previousKeyType;

    // calling functions
    if (action !== 'clear') {
        const clearButton = displayScreen.querySelector('[data-action=clear]');
        clearButton.textContent = "CE";
    }
    if (!action) {
        if (displayScreenContent === '0' || previousKeyType === 'operator' || previousKeyType === 'calculate') {
            displayContent.textContent = keyContent;
        } else {
            displayContent.textContent = displayScreenContent + keyContent;
        }
        displayScreen.dataset.previousKeyType = 'number';
        console.log('number Key');

    } else if (action == 'clear') {
        if (key.textContent == 'AC') {
            displayScreen.dataset.firstValue = '';
            displayScreen.dataset.modValue = '';
            displayScreen.dataset.previousKeyType = '';
            displayScreen.dataset.operator = '';
        }
        else {
            key.textContent = "AC";
        }
        displayContent.textContent = '0';
        displayScreen.dataset.previousKeyType = 'clear';
        console.log('clear Key');

    } else if (action == 'decimal') {
        if (!(displayScreenContent.includes('.'))) {
            displayContent.textContent = displayScreenContent + ".";
        }
        if (previousKeyType === 'operator' || previousKeyType === 'calculate') {
            displayContent.textContent = "0.";
            displayScreen.dataset.previousKeyType = 'decimal';

        }
        console.log('decimal key');

    } else if (action == 'calculate') {
        let firstValue = displayScreen.dataset.firstValue;
        const operator = displayScreen.dataset.operator;
        let secondValue = displayScreenContent;

        if (firstValue) {
            if (previousKeyType === 'calculate') {
                console.log('sjdn');
                firstValue = displayScreenContent;
                secondValue = displayScreen.dataset.modValue;
            }
            const calcValue = calculate(firstValue, operator, secondValue);
            displayContent.textContent = calcValue;
        }
        // setting attributes
        displayScreen.dataset.modValue = secondValue;
        displayScreen.dataset.previousKeyType = 'calculate';
        console.log('equal key');
    } else if (action == 'add' ||
        action == 'subtract' || action == 'multiply' || action == "divide") {
        const firstValue = displayScreen.dataset.firstValue;
        const operator = displayScreen.dataset.operator;
        const secondValue = displayScreenContent;

        //  checking if firstValue and an operator exist then calculating its value as second Value will be there for sure
        if (firstValue && operator && previousKeyType !== 'operator' &&  previousKeyType !== 'calculate') {
            const calcValue = calculate(firstValue, operator, secondValue);
            displayContent.textContent = calcValue;

            // update the first value 
            displayScreen.dataset.firstValue = calcValue;
        } 
        else {// storing first Value
            displayScreen.dataset.firstValue = displayScreenContent;
        }
        // changing key type to operator
        displayScreen.dataset.previousKeyType = 'operator';
        displayScreen.dataset.operator = action;
        console.log('operator Key');
    }
})

function calculate(firstValue, operator, secondValue) {
    const firstNum = parseFloat(firstValue);
    const secondNum = parseFloat(secondValue);
    if (operator == 'add')return firstNum + secondNum
    if (operator == 'subtract')return firstNum - secondNum;
    if (operator == 'divide')  return firstNum / secondNum;
    if (operator == 'multiply')return firstNum * secondNum;
}