display = document.querySelector('#calculator h1');



document.querySelector('#calculator').addEventListener('click', calculatorButton);

document.querySelector('body').addEventListener('keydown', keyboardInput);


previousNumber = 0;

currentOperation = 'NONE';

errorMessage = false;

operations = ['+', '-', '*', '/', '=', 'Enter'];

maxDecimals = 10;

maxDiplayChars = 15;

// history
// up/down navigate history
// after enter, new num erases old (?)

// if cant fit, round to sig figs

// shrink/grow



function handleNumInput(inputChar) {
    if (errorMessage || (display.textContent == '0' & inputChar != '.')) {
        display.textContent = inputChar;
        errorMessage = false;
    }
    else {
        display.textContent += inputChar;
    }

}

function handleOperatorInput(inputChar) {
    console.log(errorMessage);

    if (errorMessage) {
    }

    else if (inputChar == '=' && display.textContent != '') {

        if (previousNumber != 'ERROR') {
            console.log('op', currentOperation);
            console.log('prevNumber', previousNumber);
            result = operate(previousNumber, currentOperation , Number(display.textContent));
            // result = isNaN(result)? 0: result;

            if (currentOperation == 'NONE') {
                previousNumber = Number(display.textContent);
            }

            else if (isNaN(result) || !isFinite(result)) {
                display.textContent = 'Error: cannot divide by 0';
                errorMessage = true;
                previousNumber = 'ERROR';
                currentOperation = 'NONE';
            }
            else {
                if (result % 1 != 0) {
                    result = result.toFixed(maxDecimals);
                }

                display.textContent = result;
                previousNumber = result;
                currentOperation = 'NONE';
            }

            console.log('result', result);
            console.log('prevNum 2nd', previousNumber);
        }

        else {
            previousNumber = Number(display.textContent);
        }
    
    }

    else {
        currentOperation = inputChar;
        
        if (display.textContent != '') {
            previousNumber = Number(display.textContent);

            display.textContent = '';
        }
    }

}

function handleEraseInput(inputText) {
    switch (inputText) {
        case 'clr':
            display.textContent = '';
            break;

        case 'back':
            if (!errorMessage) {
                display.textContent = display.textContent.slice(0, -1);
            }
    }
}

function keyboardInput(e) {
    console.log(e.key);

    if ((!isNaN(e.key) || e.key == '.') && display.textContent.length <= maxDiplayChars) {
        handleNumInput(e.key);
    }

    else if (operations.includes(e.key)) {
        opInput = e.key == 'Enter'? '=': e.key;
        handleOperatorInput(opInput);
    }
    else if (e.key == 'Backspace') {
        handleEraseInput('back');
    }
}

function calculatorButton(e) {
    if (e.target.classList.contains('num')) {
            // if (!(e.target.textContent == '0' && display.textContent == '0')) {
            //     display.textContent += e.target.textContent;
            //     break;
            // }
            handleNumInput(e.target.textContent);
        }


    if (e.target.classList.contains('operator')) {
        handleOperatorInput(e.target.textContent);
    }

    else {
        handleEraseInput(e.target.id);
    }

    
}

function operate(a, op, b) {
    switch (op) {
        case '+':
            return a + b;
            break;

        case '-':
            return a - b;
            break;

        case '*':
            return a * b;
            break;

        case '/':
            return a / b;
            break;
    }
}