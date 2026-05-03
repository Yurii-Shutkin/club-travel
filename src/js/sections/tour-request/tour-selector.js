import { getHotOffers } from '@/js/services/api/getHotOffers.js';


function initCounter(counterDom) {
  const counter = document.querySelector(counterDom);
  const counterValue =counter.querySelector('[data-counter-value]');
  counter.addEventListener('click', (e)=>{
    const click = e.target.closest('[data-counter-decrement], [data-counter-increment]');
    if (click) {
      if (click.hasAttribute('data-counter-decrement') && counterValue.value>1) {
        --counterValue.value;
      }
      else if (click.hasAttribute('data-counter-increment')  && counterValue.value<28) {
        ++counterValue.value;
      }
    }
  })
}

async function renderCountryList() {
  const dataList = (await getHotOffers()) || [];
  const destinationSelect = document.querySelector('[data-field="destination"]');
  const destinationTemplate = destinationSelect.querySelector('[data-destination-template]');
  const destinationEl = destinationTemplate.content.querySelector('option');

  const uniqueData = dataList.filter((item, index, self) =>
      index === self.findIndex((t) => (
        t.country === item.country && t.region === item.region
      ))
  );
  const optionsList = [];

  for (let i = 0; i < uniqueData.length; i++) {
    const destinationClone = destinationEl.cloneNode(true);
    destinationClone.textContent = `${uniqueData[i].country}>${uniqueData[i].region}`;
    destinationClone.value = uniqueData.country;
    optionsList.push(destinationClone);
  }
  destinationSelect.append(...optionsList);
}


export const initTourSelector = async (root = document) => {
  const tourSelector = document.querySelector('[data-tour-selector]');
  // const tabsList = tourSelector.querySelectorAll('[data-tab]');
  // const panelsList = tourSelector.querySelectorAll('[data-panel]');
  // const btnGotoList= tourSelector.querySelectorAll('[data-btn-goto]');

  tourSelector.addEventListener('click', (e) => {
      const click = e.target.closest('[data-tab], [data-btn-goto]');
      if (click){
        const dataItem=click.dataset.tab || click.dataset.btnGoto;
        tourSelector.querySelectorAll('.is-active').forEach(el=>el.classList.remove('is-active'));
        tourSelector.querySelectorAll(`[data-tab="${dataItem}"],[data-panel="${dataItem}"]`).forEach(el=>el.classList.add('is-active'));
      }
  })

  initCounter('[data-counter]');
  await renderCountryList();
};
