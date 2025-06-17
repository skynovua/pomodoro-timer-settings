const sliders = [
    { id: "focus", unit: " min" },
    { id: "short-break", unit: " min" },
    { id: "long-break", unit: " min" },
    { id: "rounds", unit: "" },
];

// Динамічне оновлення числа
sliders.forEach(({ id, unit }) => {
    const slider = document.getElementById(id);
    const display = document.getElementById(`${id}-value`);

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
