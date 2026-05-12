export function initTourSelector() {
  const tourSelector = document.querySelector('[data-tour-selector]');

  tourSelector.addEventListener('click', e => {
    const click = e.target.closest('[data-tab], [data-btn-goto]');
    if (click) {
      const dataItem = click.dataset.tab || click.dataset.btnGoto;
      tourSelector
        .querySelectorAll('.is-active')
        .forEach(el => el.classList.remove('is-active'));
      tourSelector
        .querySelectorAll(`[data-tab="${dataItem}"],[data-panel="${dataItem}"]`)
        .forEach(el => el.classList.add('is-active'));
    }
  });
}
