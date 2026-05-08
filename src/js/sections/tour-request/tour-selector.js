import { getHotOffers } from '@/js/services/api/getHotOffers.js';

async function renderCountryList() {
  const dataList = (await getHotOffers()) || [];
  const uniqueData = dataList.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.country === item.country && t.region === item.region
      ))
  );

  const select = document.querySelector('[data-select="destination"]');
  const dropdown = select.querySelector('[data-select-dropdown]');
  const template = select.querySelector('[data-template-option]');
  const templateEl = template.content.querySelector('[data-select-option]');

  const optionsList = [];

  for (let i = 0; i < uniqueData.length; i++) {
    const cloneEl = templateEl.cloneNode(true);
    cloneEl.textContent = `${uniqueData[i].country}>${uniqueData[i].region}`;
    // cloneEl.dataset.value = uniqueData[i].country;
    optionsList.push(cloneEl);
  }
  dropdown.append(...optionsList);
}


export const initTourSelector = async (root = document) => {
  const tourSelector = document.querySelector('[data-tour-selector]');

  tourSelector.addEventListener('click', (e) => {
      const click = e.target.closest('[data-tab], [data-btn-goto]');
      if (click){
        const dataItem=click.dataset.tab || click.dataset.btnGoto;
        tourSelector.querySelectorAll('.is-active').forEach(el=>el.classList.remove('is-active'));
        tourSelector.querySelectorAll(`[data-tab="${dataItem}"],[data-panel="${dataItem}"]`).forEach(el=>el.classList.add('is-active'));
      }
  })


  await renderCountryList();
};
