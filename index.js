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
        
        // Встановлюємо ширину display з урахуванням відступів через calc()
        display.style.width = `calc(${percentage * 100}% - 6px)`;
        
        // Показуємо текст тільки якщо достатньо місця (мінімум 60px)
        const sliderWidth = slider.offsetWidth;
        const currentWidth = (percentage * sliderWidth) - 6; // Враховуємо відступи
        if (currentWidth > 60) {
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
