document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const clearButton = document.getElementById('clear');
    const equalsButton = document.getElementById('equals');
    const decimalButton = document.getElementById('decimal');
    const numberButtons = document.querySelectorAll('[id^="zero"], [id^="one"], [id^="two"], [id^="three"], [id^="four"], [id^="five"], [id^="six"], [id^="seven"], [id^="eight"], [id^="nine"]');
    const operatorButtons = document.querySelectorAll('#add, #subtract, #multiply, #divide');

    let currentInput = '';
    let previousInput = '';
    let operator = '';
    let justEvaluated = false;

    function updateDisplay(value) {
        display.textContent = value;
    }

    function clearCalculator() {
        currentInput = '0';
        previousInput = '';
        operator = '';
        updateDisplay(currentInput);
    }

    function handleNumberClick(number) {
        if (justEvaluated) {
            currentInput = number;
            justEvaluated = false;
        } else {
            currentInput = currentInput === '0' ? number : currentInput + number;
        }
        updateDisplay(currentInput);
    }

    function handleOperatorClick(op) {
        if (operator && !justEvaluated) {
            calculate();
        }
        previousInput = currentInput;
        currentInput = '';
        operator = op;
        justEvaluated = false;
    }

    function handleDecimalClick() {
        if (justEvaluated) {
            currentInput = '0.';
            justEvaluated = false;
        } else if (!currentInput.includes('.')) {
            currentInput = currentInput ? currentInput + '.' : '0.';
        }
        updateDisplay(currentInput);
    }

    function calculate() {
        if (!operator) return;

        const a = parseFloat(previousInput);
        const b = parseFloat(currentInput);
        if (isNaN(a) || isNaN(b)) return;

        let result;
        switch (operator) {
            case '+':
                result = a + b;
                break;
            case '-':
                result = a - b;
                break;
            case '*':
                result = a * b;
                break;
            case '/':
                result = a / b;
                break;
            default:
                return;
        }

        currentInput = result.toString();
        operator = '';
        previousInput = '';
        updateDisplay(currentInput);
        justEvaluated = true;
    }

    clearButton.addEventListener('click', clearCalculator);

    equalsButton.addEventListener('click', calculate);

    decimalButton.addEventListener('click', handleDecimalClick);

    numberButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleNumberClick(button.textContent);
        });
    });

    operatorButtons.forEach(button => {
        button.addEventListener('click', () => {
            handleOperatorClick(button.textContent);
        });
    });

    clearCalculator();
});
