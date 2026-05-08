export function selectClose() {
  const selectList = document.querySelectorAll('[data-select]');
  selectList.forEach(select => {
    const triggerBtn = select.querySelector('[data-select-trigger]');
    if (triggerBtn) triggerBtn.setAttribute('aria-expanded', 'false');
    select.classList.remove('is-open');
  });
}

export function selectOpen(triggerEl) {
  const select = triggerEl.closest('[data-select]');
  const isOpen = select.classList.contains('is-open');
  selectClose();

  if (!isOpen) {
    select.classList.add('is-open');
    triggerEl.setAttribute('aria-expanded', 'true');
  }
}

export function selectOption(option) {
  const select = option.closest('[data-select]');
  const label = select.querySelector('[data-select-value]');
  const input = select.querySelector('[data-select-input]');
  const allOptions = select.querySelectorAll('[data-select-option]');

  if (option.dataset.value) input.value = option.dataset.value.trim();
  label.textContent = option.textContent.trim();

  allOptions.forEach(opt => opt.setAttribute('aria-selected', 'false'));
  option.setAttribute('aria-selected', 'true');

  selectClose();
}