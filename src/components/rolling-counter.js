/**
 * RollingCounter - animated number display component with mechanical counter effect
 */
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
        
        const digitsContainer = document.createElement('div');
        digitsContainer.className = 'digits-container';
        
        for (let i = 0; i < this.digits; i++) {
            this.addDigit(digitsContainer);
        }
        
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
        
        const actualDigits = Math.max(1, numValue.toString().length);
        const digitsContainer = this.container.querySelector('.digits-container');
        
        const digitWidth = 8;
        const newWidth = actualDigits * digitWidth;
        
        if (animate) {
            digitsContainer.style.width = `${newWidth}px`;
        } else {
            digitsContainer.style.transition = 'none';
            digitsContainer.style.width = `${newWidth}px`;
            setTimeout(() => {
                digitsContainer.style.transition = 'width 0.2s ease-out';
            }, 1);
        }
        
        this.unitElement.textContent = unit;
        this.unit = unit;
        
        for (let i = 0; i < this.digits; i++) {
            const digit = parseInt(paddedValue[i]);
            const wheel = this.digitElements[i];
            const translateY = -digit * 14;
            
            // Hide leading zeros
            const digitContainer = wheel.parentElement;
            if (i < this.digits - actualDigits) {
                digitContainer.style.display = 'none';
            } else {
                digitContainer.style.display = 'flex';
            }
            
            if (animate) {
                setTimeout(() => {
                    wheel.style.transform = `translateY(${translateY}px)`;
                }, i * 50);
            } else {
                wheel.style.transition = 'none';
                wheel.style.transform = `translateY(${translateY}px)`;
                setTimeout(() => {
                    wheel.style.transition = 'transform 0.2s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                }, 1);
            }
        }
        
        this.currentValue = numValue;
    }
}
