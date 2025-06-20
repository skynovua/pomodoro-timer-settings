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

        const containerWidth = slider.parentElement.offsetWidth - INPUT_PADDING;
        
        // Set minimum width and calculate available space for steps
        const minWidth = 12;
        const availableWidth = containerWidth - minWidth;
        
        // Calculate step width in the available space
        const stepWidth = availableWidth / totalSteps;
        const currentStep = (value - min) / step;
        
        // Calculate target width: minimum + proportional step width
        const targetWidth = minWidth + (currentStep * stepWidth);        

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
