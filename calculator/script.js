const display = document.getElementById('display');

function appendToDisplay(value) {
    if (display.textContent === '0' || display.textContent === 'Error') {
        display.textContent = value;
    } else {
        display.textContent += value;
    }
}

function clearDisplay() {
    display.textContent = '0';
}

function calculateResult() {
    try {
        const result = eval(display.textContent);
        display.textContent = result;
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateSquareRoot() {
    try {
        const value = parseFloat(display.textContent);
        if (value < 0) {
            display.textContent = 'Error';
        } else {
            display.textContent = Math.sqrt(value);
        }
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateSquare() {
    try {
        const value = parseFloat(display.textContent);
        display.textContent = Math.pow(value, 2);
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateSin() {
    try {
        const value = parseFloat(display.textContent);
        display.textContent = Math.sin(value * (Math.PI / 180));
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateCos() {
    try {
        const value = parseFloat(display.textContent);
        display.textContent = Math.cos(value * (Math.PI / 180));
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateTan() {
    try {
        const value = parseFloat(display.textContent);
        display.textContent = Math.tan(value * (Math.PI / 180));
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateLog() {
    try {
        const value = parseFloat(display.textContent);
        if (value <= 0) {
            display.textContent = 'Error';
        } else {
            display.textContent = Math.log10(value);
        }
    } catch (error) {
        display.textContent = 'Error';
    }
}

function calculateLn() {
    try {
        const value = parseFloat(display.textContent);
        if (value <= 0) {
            display.textContent = 'Error';
        } else {
            display.textContent = Math.log(value);
        }
    } catch (error) {
        display.textContent = 'Error';
    }
}
