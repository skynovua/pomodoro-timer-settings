// Отримуємо всі слайдери та їх data-атрибути
const sliders = document.querySelectorAll('input[type="range"][data-unit]');

// Динамічне оновлення числа
sliders.forEach((slider) => {
    const unit = slider.dataset.unit; // Отримуємо одиницю з data-атрибута
    const display = document.getElementById(`${slider.id}-value`);

    slider.addEventListener("input", () => {
        const value = slider.value;
        const unit = slider.dataset.unit;
        const displayText = value + unit;
        
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
        
        // Показуємо текст тільки якщо достатньо місця (мінімум 60px)
        if (targetWidth > 60) {
            display.textContent = displayText;
            display.style.opacity = '1';
        } else {
            display.textContent = '';
            display.style.opacity = '0.8';
        }
        
        // Позиціонуємо
        display.style.left = '3px';
        display.style.transform = 'none';
    });

    // Ініціалізація правильної позиції при завантаженні
    slider.dispatchEvent(new Event("input"));
});
