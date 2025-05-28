// utils.js
function elementExists(selector) {
    return document.querySelector(selector) !== null;
}

// Эффект увеличения кнопок (не обязателен, можно через CSS)
function addHoverEffect(selector, scale = 1.05) {
    const element = document.querySelector(selector);
    if (element) {
        element.addEventListener('mouseover', () => {
            element.style.transform = `scale(${scale})`;
        });
        element.addEventListener('mouseout', () => {
            element.style.transform = 'scale(1)';
        });
    }
}