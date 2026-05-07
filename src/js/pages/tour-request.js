import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import '@/js/sections/main/hero-swiper.js';

import { initTourSelector } from '@/js/sections/tour-request/tour-selector.js';

document.addEventListener('DOMContentLoaded', async () => {
await initTourSelector();
updateDisabledState();

  await init();

});

const init = async () => {
  document.addEventListener('click', e => {
    const triggerEl = e.target.closest('[data-select-trigger]');
    const option = e.target.closest('[data-select-option]');
    const counterBtn = e.target.closest('[data-counter-decrement], [data-counter-increment]');

    if (triggerEl) {
      selectOpen(triggerEl);
    } else if (option) {
      selectOption(option);
    } else if (counterBtn) {
      initCounter(counterBtn);
    }
    else {
      closeAllSelects();
    }
  });
}


function initCounter(counterBtn) {
  const counter = counterBtn.closest('[data-counter]');
  const counterValue =counter.querySelector('[data-counter-value]');

      if (counterBtn.hasAttribute('data-counter-decrement') && counterValue.textContent>1) {
        --counterValue.textContent;
      }
      else if (counterBtn.hasAttribute('data-counter-increment')  && counterValue.textContent<28) {
        ++counterValue.textContent;
      }
}


function updateDisabledState() {
  const selectList = document.querySelectorAll('[data-select]');
  selectList.forEach(select => {
    const options = select.querySelectorAll('[data-select-option]');

    if (options.length === 0) {
      select.classList.add('is-disabled');
      select.setAttribute('aria-disabled', 'true');
    } else {
      select.classList.remove('is-disabled');
      select.removeAttribute('aria-disabled');
    }
  });
}

function closeAllSelects() {
  const selectList = document.querySelectorAll('[data-select]');
  selectList.forEach(select => {
    const triggerBtn = select.querySelector('[data-select-trigger]');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
    select.classList.remove('is-open');
  });
}

function selectOpen(triggerEl) {
  const select = triggerEl.closest('[data-select]');
  const isOpen = select.classList.contains('is-open');
  closeAllSelects();

  if (!isOpen) {
    select.classList.add('is-open');
    triggerEl.setAttribute('aria-expanded', 'true');
  }
}

function selectOption(option) {
  const select = option.closest('[data-select]');
  const label = select.querySelector('[data-select-value]');
  const input = select.querySelector('[data-select-input]');
  const allOptions = select.querySelectorAll('[data-select-option]');

  if (option.dataset.value) input.value = option.dataset.value.trim();
  label.textContent = option.textContent.trim();

  allOptions.forEach(opt => opt.setAttribute('aria-selected', 'false'));
  option.setAttribute('aria-selected', 'true');

  closeAllSelects();
}
// });
