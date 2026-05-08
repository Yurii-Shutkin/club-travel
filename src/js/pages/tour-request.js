import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import '@/js/sections/main/hero-swiper.js';

import { initTourSelector } from '@/js/sections/tour-request/tour-selector.js';
import { selectClose, selectOpen, selectOption } from '@/js/ui/custom-select.js';
import { initCounter } from '@/js/ui/counter.js';
import { updateDisabledState } from '@/js/ui/disabled-state.js';

document.addEventListener('DOMContentLoaded', async () => {
  await initTourSelector();


  await initDocClick();

  updateDisabledState();
});



const initDocClick = async () => {
  document.addEventListener('click', e => {
    const triggerEl = e.target.closest('[data-select-trigger]');
    const option = e.target.closest('[data-select-option]');
    const counterBtn = e.target.closest(
      '[data-counter-decrement], [data-counter-increment]',
    );

    if (triggerEl) {
      selectOpen(triggerEl);
    } else if (option) {
      selectOption(option);
    } else if (counterBtn) {
      initCounter(counterBtn);
    } else {
      selectClose();
    }
  });
};
