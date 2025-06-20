/**
 * Pomodoro slider controller with rolling counter animation
 */

const sliders = document.querySelectorAll('input[type="range"][data-unit]');
const rollingCounters = new Map();
const INPUT_PADDING = 6; // Padding for the input container

sliders.forEach((slider) => {
    const unit = slider.dataset.unit;
    const display = document.getElementById(`${slider.id}-value`);
    const rollingCounterDisplay = display.querySelector('.rolling-counter');

    const maxValue = parseInt(slider.max);
    const digits = Math.max(2, maxValue.toString().length);
    const rollingCounter = new RollingCounter(rollingCounterDisplay, digits);
    rollingCounters.set(slider.id, rollingCounter);

    const initialValue = parseInt(slider.value);
    rollingCounter.setNumber(initialValue, unit, false);

    slider.addEventListener("input", () => {
        const value = parseInt(slider.value);
        const unit = slider.dataset.unit;

        rollingCounter.setNumber(value, unit, true);

        const percentage = (value - slider.min) / (slider.max - slider.min);

        const min = parseFloat(slider.min);
        const max = parseFloat(slider.max);
        const step = parseFloat(slider.step) || 1;
        const range = max - min;
        const totalSteps = range / step;

        const containerWidth = slider.parentElement.offsetWidth - INPUT_PADDING; // Subtract 6px for padding
        const stepDistance = containerWidth / (totalSteps + 1); // Add 1px for better alignment

        const leftPadding = Math.round(stepDistance);
        const minWidth = leftPadding;        

        const availableWidth = containerWidth - leftPadding;
        const targetWidth = Math.max(minWidth, percentage * availableWidth + leftPadding);        

        display.style.width = `${targetWidth}px`;

        requestAnimationFrame(() => {
            const rollingCounterWidth = rollingCounterDisplay.offsetWidth;
            const displayWidth = targetWidth;
            const availableSpace = displayWidth - 20;

            if (rollingCounterWidth > availableSpace) {
                rollingCounterDisplay.style.transform = `translate(${displayWidth}px, -50%)`;
            } else {
                rollingCounterDisplay.style.transform = 'translate(0, -50%)';
            }
        });

        display.style.opacity = '1';
        display.style.left = `${INPUT_PADDING / 2}px`;
        display.style.transform = 'none';
    });

    slider.dispatchEvent(new Event("input"));
});
