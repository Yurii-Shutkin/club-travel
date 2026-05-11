import { updateGuestValue } from '@/js/ui/custom-select.js';

export function initCounter() {

  document.querySelectorAll('[data-counter]').forEach((counter) => {
    counter.addEventListener('click', (e) => {
      const clickBtn = e.target.closest('[data-counter-decrement], [data-counter-increment]');
      if (!clickBtn) return;
      e.stopPropagation();

      const counterValue = counter.querySelector('[data-counter-value]');
      if (!counterValue) return;
      const guestSelect = counter.closest('[data-guests-selector]');

      const min = Number(counter.dataset.min) || 0;
      const max = Number(counter.dataset.max) || Infinity;

      let value = Number(counterValue.textContent.trim());
      if (
        clickBtn.hasAttribute('data-counter-decrement') &&
        value > min) {
        --value;
      } else if (
        clickBtn.hasAttribute('data-counter-increment') &&
        value < max) {
        ++value;
      }
      counterValue.textContent = String(value);
      if (guestSelect) {
        updateGuestValue(guestSelect);
      }
    })
  })
}