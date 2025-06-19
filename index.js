// Клас для rolling counter анімації
class RollingCounter {
    constructor(container, digits = 3) {
        this.container = container;
        this.digits = digits;
        this.digitElements = [];
        this.currentValue = 0;
        this.unit = '';
        this.init();
    }

    init() {
        this.container.innerHTML = '';
        this.container.classList.add('rolling-counter');
        
        // Створюємо контейнер для цифр
        const digitsContainer = document.createElement('div');
        digitsContainer.className = 'digits-container';
        
        // Створюємо цифри
        for (let i = 0; i < this.digits; i++) {
            this.addDigit(digitsContainer);
        }
        
        // Створюємо контейнер для одиниці виміру
        const unitContainer = document.createElement('div');
        unitContainer.className = 'unit-container';
        
        this.container.appendChild(digitsContainer);
        this.container.appendChild(unitContainer);
        this.unitElement = unitContainer;
    }

    addDigit(parent) {
        const digitContainer = document.createElement('div');
        digitContainer.className = 'digit-container';
        
        const digitWheel = document.createElement('div');
        digitWheel.className = 'digit-wheel';
        
        // Створюємо цифри 0-9
        for (let j = 0; j <= 9; j++) {
            const digit = document.createElement('div');
            digit.className = 'digit';
            digit.textContent = j;
            digitWheel.appendChild(digit);
        }
        
        digitContainer.appendChild(digitWheel);
        parent.appendChild(digitContainer);
        this.digitElements.push(digitWheel);
    }

    setNumber(value, unit = '', animate = true) {
        const numValue = parseInt(value) || 0;
        const paddedValue = Math.abs(numValue).toString().padStart(this.digits, '0');
        
        // Оновлюємо одиницю виміру
        this.unitElement.textContent = unit;
        this.unit = unit;
        
        for (let i = 0; i < this.digits; i++) {
            const digit = parseInt(paddedValue[i]);
            const wheel = this.digitElements[i];
            const translateY = -digit * 14; // 14px висота одної цифри
            
            if (animate) {
                // Додаємо невелику затримку для кожної цифри для красивого ефекту
                setTimeout(() => {
                    wheel.style.transform = `translateY(${translateY}px)`;
                }, i * 50);
            } else {
                // Без анімації для початкового значення
                wheel.style.transition = 'none';
                wheel.style.transform = `translateY(${translateY}px)`;
                // Відновлюємо анімацію
                setTimeout(() => {
                    wheel.style.transition = 'transform 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 1);
            }
        }
        
        this.currentValue = numValue;
    }
}

// Отримуємо всі слайдери та їх data-атрибути
const sliders = document.querySelectorAll('input[type="range"][data-unit]');

// Створюємо rolling counters для кожного слайдера
const rollingCounters = new Map();

// Динамічне оновлення числа
sliders.forEach((slider) => {
    const unit = slider.dataset.unit; // Отримуємо одиницю з data-атрибута
    const display = document.getElementById(`${slider.id}-value`);
    const displayValue = display.querySelector('span');
    
    // Створюємо rolling counter для цього слайдера
    const maxValue = parseInt(slider.max);
    const digits = Math.max(2, maxValue.toString().length); // Мінімум 2 цифри
    const rollingCounter = new RollingCounter(displayValue, digits);
    rollingCounters.set(slider.id, rollingCounter);
    
    // Ініціалізуємо початкове значення
    const initialValue = parseInt(slider.value);
    rollingCounter.setNumber(initialValue, unit, false);

    slider.addEventListener("input", () => {
        const value = parseInt(slider.value);
        const unit = slider.dataset.unit;
        
        // Анімуємо зміну числа за допомогою rolling counter
        rollingCounter.setNumber(value, unit, true);
        
        // Розрахунок відсотка для ширини
        const percentage = (value - slider.min) / (slider.max - slider.min);
        
        // Автоматичний розрахунок відступу на основі кроку слайдера
        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const step = parseFloat(slider.step) || 1; // якщо step не вказаний, використовуємо 1
        const range = max - min;
        const totalSteps = range / step;
        
        // Ширина контейнера та відстань між кроками
        const containerWidth = slider.parentElement.offsetWidth;
        const stepDistance = containerWidth / totalSteps;
        
        // Відступ зліва = відстань одного кроку
        const leftPadding = Math.round(stepDistance);
        const minWidth = leftPadding + 10; // мінімальна ширина для відображення
        
        // Розраховуємо ширину з урахуванням автоматичних відступів
        const availableWidth = containerWidth - leftPadding - 6; // 6px для правого відступу
        const targetWidth = Math.max(minWidth, percentage * availableWidth + leftPadding);
        
        // Встановлюємо ширину
        display.style.width = `${targetWidth}px`;
        
        // Чекаємо на наступний кадр, щоб отримати правильні розміри після анімації числа
        requestAnimationFrame(() => {
            const spanWidth = displayValue.offsetWidth;
            const displayWidth = targetWidth;
            const availableSpace = displayWidth - 20; // враховуємо padding
            
            if (spanWidth > availableSpace) {
                // Span не міститься - переміщуємо його правіше value-display
                displayValue.style.transform = `translate(${displayWidth}px, -50%)`; // 10px для відступу
            } else {
                displayValue.style.transform = 'translate(0, -50%)'; // Відновлюємо позицію
            }
        });
        
        display.style.opacity = '1';
        
        // Позиціонуємо
        display.style.left = '3px';
        display.style.transform = 'none';
    });

    // Ініціалізація правильної позиції при завантаженні
    slider.dispatchEvent(new Event("input"));
});
