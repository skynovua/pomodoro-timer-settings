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
        const sliderWidth = slider.offsetWidth;
        
        // Встановлюємо ширину display як відсоток від слайдера
        display.style.width = `${percentage * 100}%`;
        
        // Показуємо текст тільки якщо достатньо місця (мінімум 60px)
        const currentWidth = (percentage * sliderWidth);
        if (currentWidth > 60) {
            display.textContent = displayText;
            display.style.opacity = '1';
        } else {
            display.textContent = '';
            display.style.opacity = '0.8';
        }
        
        // Позиціонуємо
        display.style.left = '2px';
        display.style.transform = 'none';
    });

    // Ініціалізація правильної позиції при завантаженні
    slider.dispatchEvent(new Event("input"));
});
