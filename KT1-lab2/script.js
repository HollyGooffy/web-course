// Получаем элементы
const fromBaseSelect = document.getElementById('fromBase');
const toBaseSelect = document.getElementById('toBase');
const inputDisplay = document.getElementById('inputDisplay');
const resultDisplay = document.getElementById('resultDisplay');
const digitButtons = document.querySelectorAll('.digit-btn');
const convertBtn = document.getElementById('convertBtn');
const clearBtn = document.getElementById('clearBtn');

let currentInput = '';

function updateButtonStates() {
    const fromBase = parseInt(fromBaseSelect.value);
    
    digitButtons.forEach(button => {
        const value = button.getAttribute('data-value');
        const digitValue = getDigitValue(value);
        
        if (digitValue < fromBase) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    });
}

function getDigitValue(digit) {
    if (digit >= '0' && digit <= '9') {
        return parseInt(digit);
    }
    // A=10, B=11, C=12, D=13, E=14, F=15
    return digit.charCodeAt(0) - 'A'.charCodeAt(0) + 10;
}

function getDigitSymbol(value) {
    if (value < 10) {
        return value.toString();
    }
    return String.fromCharCode('A'.charCodeAt(0) + value - 10);
}

function isValidNumber(number, base) {
    if (!number) return false;
    
    for (let char of number) {
        const digitValue = getDigitValue(char);
        if (digitValue >= base) {
            return false;
        }
    }
    return true;
}

function toDecimal(number, fromBase) {
    let result = 0;
    let power = 0;
    
    // Идем справа налево
    for (let i = number.length - 1; i >= 0; i--) {
        const digitValue = getDigitValue(number[i]);
        result += digitValue * Math.pow(fromBase, power);
        power++;
    }
    
    return result;
}

function fromDecimal(decimal, toBase) {
    if (decimal === 0) return '0';
    
    let result = '';
    
    while (decimal > 0) {
        const remainder = decimal % toBase;
        result = getDigitSymbol(remainder) + result;
        decimal = Math.floor(decimal / toBase);
    }
    
    return result;
}

digitButtons.forEach(button => {
    button.addEventListener('click', () => {
        if (!button.disabled) {
            const value = button.getAttribute('data-value');
            currentInput += value;
            inputDisplay.value = currentInput;
        }
    });
});

convertBtn.addEventListener('click', () => {
    if (!currentInput) {
        resultDisplay.value = 'Введите число';
        return;
    }
    
    const fromBase = parseInt(fromBaseSelect.value);
    const toBase = parseInt(toBaseSelect.value);
    
    // Проверяем корректность введенного числа
    if (!isValidNumber(currentInput, fromBase)) {
        resultDisplay.value = 'Ошибка: некорректное число';
        return;
    }
    
    try {
        // Переводим в десятичную систему
        const decimal = toDecimal(currentInput, fromBase);
        
        // Переводим из десятичной в целевую систему
        const result = fromDecimal(decimal, toBase);
        
        resultDisplay.value = result;
    } catch (error) {
        resultDisplay.value = 'Ошибка при переводе';
    }
});

// Обработчик для кнопки "Сброс"
clearBtn.addEventListener('click', () => {
    currentInput = '';
    inputDisplay.value = '';
    resultDisplay.value = '';
});

// Обработчики для изменения системы счисления
fromBaseSelect.addEventListener('change', () => {
    updateButtonStates();
    // Очищаем ввод при смене системы
    currentInput = '';
    inputDisplay.value = '';
    resultDisplay.value = '';
});

toBaseSelect.addEventListener('change', () => {
    // Очищаем результат при смене целевой системы
    resultDisplay.value = '';
});

// Инициализация состояния кнопок при загрузке
updateButtonStates();
