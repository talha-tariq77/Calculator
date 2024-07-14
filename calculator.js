display = document.querySelector('#calculator h1');



document.querySelector('#calculator').addEventListener('click', calculatorButton);

previousNumber = 0;

currentOperation = 'NONE';

errorMessage = false;

function calculatorButton(e) {
    if (e.target.classList.contains('num')) {
            // if (!(e.target.textContent == '0' && display.textContent == '0')) {
            //     display.textContent += e.target.textContent;
            //     break;
            // }
            if (errorMessage || (display.textContent == '0' & e.target.textContent != '.')) {
                display.textContent = e.target.textContent;
                errorMessage = false;
            }
            else {
                display.textContent += e.target.textContent;
            }
        }


    if (e.target.classList.contains('operator')) {

        console.log(errorMessage);

        if (errorMessage) {
        }

        else if (e.target.id == 'equals') {

            if (previousNumber != 'ERROR') {
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
                    display.textContent = result;
                    previousNumber = result;
                }

                console.log('result', result);
                console.log('prevNum 2nd', previousNumber);
            }

            else {
                previousNumber = Number(display.textContent);
            }
        
        }

        else {
            previousNumber = Number(display.textContent);
            currentOperation = e.target.textContent;

            display.textContent = '';
        }
    }

    else {
        switch (e.target.id) {
            case 'clr':
                display.textContent = '';
                break;

            case 'back':
                if (!errorMessage) {
                    display.textContent = display.textContent.slice(0, -1);
                }
        }
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