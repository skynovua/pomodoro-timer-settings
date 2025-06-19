// Отримуємо всі слайдери та їх data-атрибути
const sliders = document.querySelectorAll('input[type="range"][data-unit]');

// Функція для анімації зміни числа (Number rolling animation)
function animateNumber(element, from, to, duration = 300) {
    const startTime = performance.now();
    const difference = to - from;
    
    function update(currentTime) {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        
        // Використовуємо easeOutQuart для плавної анімації
        const easeProgress = 1 - Math.pow(1 - progress, 4);
        const currentValue = Math.round(from + difference * easeProgress);
        
        // Оновлюємо текст з одиницею виміру
        const unit = element.dataset.unit || '';
        element.textContent = currentValue + unit;
        
        if (progress < 1) {
            requestAnimationFrame(update);
        }
    }
    
    requestAnimationFrame(update);
}

// Динамічне оновлення числа
sliders.forEach((slider) => {
    const unit = slider.dataset.unit; // Отримуємо одиницю з data-атрибута
    const display = document.getElementById(`${slider.id}-value`);
    const displayValue = display.querySelector('span');
    
    // Зберігаємо попереднє значення для анімації
    let previousValue = parseInt(slider.value);

    slider.addEventListener("input", () => {
        const value = parseInt(slider.value);
        const unit = slider.dataset.unit;
        
        // Анімуємо зміну числа
        displayValue.dataset.unit = unit;
        animateNumber(displayValue, previousValue, value);
        previousValue = value;
        
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
