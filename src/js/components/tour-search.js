const tourSearchBlocks = document.querySelectorAll('[data-tour-search]');

tourSearchBlocks.forEach(tourSearch => {
  const openButton = tourSearch.querySelector('[data-tour-search-toggle]');
  const closeButton = tourSearch.querySelector('[data-tour-search-close]');
  const priceBlock = tourSearch.querySelector('[data-tour-search-price]');

  const openAdvancedSearch = () => {
    tourSearch.classList.add('tour-search_expanded');
  };

  const closeAdvancedSearch = () => {
    tourSearch.classList.remove('tour-search_expanded');
  };

  openButton?.addEventListener('click', openAdvancedSearch);
  closeButton?.addEventListener('click', closeAdvancedSearch);

  if (priceBlock) {
    initPriceRange(priceBlock);
  }
});

function initPriceRange(priceBlock) {
  const minInput = priceBlock.querySelector('[data-tour-search-price-min]');
  const maxInput = priceBlock.querySelector('[data-tour-search-price-max]');
  const priceValues = priceBlock.querySelectorAll('.tour-search__price_value');

  if (!minInput || !maxInput || priceValues.length < 2) {
    return;
  }

  const minValueText = priceValues[0];
  const maxValueText = priceValues[1];

  const minLimit = Number(minInput.min);
  const maxLimit = Number(maxInput.max);
  const minGap = Number(minInput.step) || 1;

  const getPercent = value => {
    return ((value - minLimit) / (maxLimit - minLimit)) * 100;
  };

  const updatePriceView = () => {
    const minValue = Number(minInput.value);
    const maxValue = Number(maxInput.value);

    minValueText.textContent = `${minValue}€`;
    maxValueText.textContent = `${maxValue}€`;

    priceBlock.style.setProperty(
      '--price-min-position',
      `${getPercent(minValue)}%`,
    );

    priceBlock.style.setProperty(
      '--price-max-position',
      `${getPercent(maxValue)}%`,
    );
  };

  const handleMinInput = () => {
    const minValue = Number(minInput.value);
    const maxValue = Number(maxInput.value);

    if (minValue > maxValue - minGap) {
      minInput.value = maxValue - minGap;
    }

    updatePriceView();
  };

  const handleMaxInput = () => {
    const minValue = Number(minInput.value);
    const maxValue = Number(maxInput.value);

    if (maxValue < minValue + minGap) {
      maxInput.value = minValue + minGap;
    }

    updatePriceView();
  };

  minInput.addEventListener('input', handleMinInput);
  maxInput.addEventListener('input', handleMaxInput);

  updatePriceView();
}
