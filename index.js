// Отримуємо всі слайдери та їх data-атрибути
const sliders = document.querySelectorAll('input[type="range"][data-unit]');

// Динамічне оновлення числа
sliders.forEach((slider) => {
    const unit = slider.dataset.unit; // Отримуємо одиницю з data-атрибута
    const display = document.getElementById(`${slider.id}-value`);

    slider.addEventListener("input", () => {
        const value = slider.value;
        display.textContent = value + unit;

        // Оновлення позиції числа
        const percentage = (value - slider.min) / (slider.max - slider.min);
        const sliderWidth = slider.offsetWidth;
        const thumbWidth = 20; // Ширина повзунка
        const offset = percentage * (sliderWidth - thumbWidth);
        display.style.left = `calc(${offset}px + ${thumbWidth / 2}px)`;
    });

    // Ініціалізація правильної позиції при завантаженні
    slider.dispatchEvent(new Event("input"));
});
