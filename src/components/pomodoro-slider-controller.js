/**
 * Pomodoro slider controller with rolling counter animation
 */

const sliders = document.querySelectorAll('input[type="range"][data-unit]');
const rollingCounters = new Map();

sliders.forEach((slider) => {
    const unit = slider.dataset.unit;
    const display = document.getElementById(`${slider.id}-value`);
    const displayValue = display.querySelector('span');
    
    const maxValue = parseInt(slider.max);
    const digits = Math.max(2, maxValue.toString().length);
    const rollingCounter = new RollingCounter(displayValue, digits);
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
        
        const containerWidth = slider.parentElement.offsetWidth;
        const stepDistance = containerWidth / totalSteps;
        
        const leftPadding = Math.round(stepDistance);
        const minWidth = leftPadding + 10;
        
        const availableWidth = containerWidth - leftPadding - 6;
        const targetWidth = Math.max(minWidth, percentage * availableWidth + leftPadding);
        
        display.style.width = `${targetWidth}px`;
        
        requestAnimationFrame(() => {
            const spanWidth = displayValue.offsetWidth;
            const displayWidth = targetWidth;
            const availableSpace = displayWidth - 20;
            
            if (spanWidth > availableSpace) {
                displayValue.style.transform = `translate(${displayWidth}px, -50%)`;
            } else {
                displayValue.style.transform = 'translate(0, -50%)';
            }
        });
        
        display.style.opacity = '1';
        display.style.left = '3px';
        display.style.transform = 'none';
    });

    slider.dispatchEvent(new Event("input"));
});
