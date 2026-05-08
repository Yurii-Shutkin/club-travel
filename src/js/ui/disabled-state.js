export function updateDisabledState() {
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