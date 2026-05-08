export function initCounter(counterBtn) {
  const counter = counterBtn.closest('[data-counter]');
  const counterValue = counter.querySelector('[data-counter-value]');

  if (
    counterBtn.hasAttribute('data-counter-decrement') &&
    counterValue.textContent > 1) {
    --counterValue.textContent;
  } else if (
    counterBtn.hasAttribute('data-counter-increment') &&
    counterValue.textContent < 28) {
    ++counterValue.textContent;
  }
}