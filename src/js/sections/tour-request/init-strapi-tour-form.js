import { API_URL } from '@/js/services/api/constants.js';
import { updateDisabledState } from '@/js/ui/disabled-state.js';

const HOTEL_QUERY = [
  'pagination[pageSize]=100',
  'sort[0]=dateOfDeparture:asc',
  'fields[0]=hotelName',
  'fields[1]=dateOfDeparture',
  'fields[2]=daysDuration',
  'fields[3]=priceForPerson',
  'fields[4]=typeOfMeal',
  'fields[5]=stars',
  'populate[region][fields][0]=name',
  'populate[country][fields][0]=name',
].join('&');

const formatDate = date => {
  if (!date) return '';

  return new Date(date).toLocaleDateString('ru-RU', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  });
};

const normalizeHotel = hotel => {
  const attrs = hotel.attributes || hotel;
  const country = attrs.country?.data?.attributes || attrs.country || {};
  const region = attrs.region?.data?.attributes || attrs.region || {};
  const destination = [country.name, region.name].filter(Boolean).join(' > ');

  return {
    id: hotel.documentId || hotel.id,
    hotelName: attrs.hotelName || '',
    destination,
    dateOfDeparture: attrs.dateOfDeparture || '',
    dateLabel: formatDate(attrs.dateOfDeparture),
    daysDuration: attrs.daysDuration || null,
    priceForPerson: attrs.priceForPerson || null,
    typeOfMeal: attrs.typeOfMeal || '',
    stars: attrs.stars || null,
  };
};

const getTourHotels = async () => {
  try {
    const response = await fetch(`${API_URL}v2-hotels?${HOTEL_QUERY}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { data } = await response.json();
    return data?.map(normalizeHotel) || [];
  } catch (error) {
    console.error('Ошибка при загрузке туров для формы:', error);
    return [];
  }
};

const getUniqueBy = (items, key) => {
  const map = new Map();

  items.forEach(item => {
    const value = item[key];
    if (value && !map.has(value)) map.set(value, item);
  });

  return [...map.values()];
};

const getSelectParts = name => {
  const select = document.querySelector(`[data-select="${name}"]`);
  if (!select) return null;

  return {
    select,
    dropdown: select.querySelector('[data-select-dropdown]'),
    template: select.querySelector('[data-template-option]'),
    label: select.querySelector('[data-select-value]'),
    input: select.querySelector('[data-select-input]'),
  };
};

const resetSelect = (name, placeholder) => {
  const parts = getSelectParts(name);
  if (!parts) return;

  parts.input.value = '';
  parts.label.textContent = placeholder;
  parts.select.querySelectorAll('[data-select-option]').forEach(option => {
    option.setAttribute('aria-selected', 'false');
  });
};

const setSelectValue = (name, value, label = value) => {
  const parts = getSelectParts(name);
  if (!parts) return;

  parts.input.value = value || '';
  parts.label.textContent = label || '';
  parts.select.querySelectorAll('[data-select-option]').forEach(option => {
    const isSelected = option.dataset.value === value;
    option.setAttribute('aria-selected', String(isSelected));
  });
};

const renderSelectOptions = (name, options) => {
  const parts = getSelectParts(name);
  if (!parts || !parts.dropdown || !parts.template) return;

  const templateOption = parts.template.content.querySelector('[data-select-option]');
  parts.dropdown.innerHTML = '';

  const optionElements = options.map(option => {
    const element = templateOption.cloneNode(true);
    element.textContent = option.label;
    element.dataset.value = option.value;
    return element;
  });

  parts.dropdown.append(...optionElements);
};

const setNumberInputValue = (selector, value) => {
  const input = document.querySelector(selector);
  if (input && value) input.value = value;
};

const setCounterValue = (type, value) => {
  const counter = document.querySelector(`[data-counter="${type}"]`);
  const output = counter?.querySelector('[data-counter-value]');

  if (output && value) output.textContent = String(value);
};

const setRatingValue = value => {
  const ratingInput = document.querySelector(`input[name="hotel_rating"][value="${value}"]`);
  if (ratingInput) ratingInput.checked = true;
};

const findSelectedHotel = hotels => {
  const destinationValue = getSelectParts('destination')?.input.value;
  const dateValue = getSelectParts('date')?.input.value;

  return hotels.find(hotel =>
    hotel.destination === destinationValue &&
    (!dateValue || hotel.dateOfDeparture === dateValue),
  );
};

const syncFormFromHotel = hotel => {
  if (!hotel) return;

  setNumberInputValue('[data-panel="preferences"] input[type="number"]', hotel.priceForPerson);
  setCounterValue('days', hotel.daysDuration);
  setRatingValue(hotel.stars);
};

const renderDateOptions = hotels => {
  const destinationValue = getSelectParts('destination')?.input.value;
  const filteredHotels = destinationValue
    ? hotels.filter(hotel => hotel.destination === destinationValue)
    : hotels;

  renderSelectOptions('date', getUniqueBy(filteredHotels, 'dateOfDeparture').map(hotel => ({
    label: hotel.dateLabel,
    value: hotel.dateOfDeparture,
  })));
};

const selectFirstAvailableDate = hotels => {
  const destinationValue = getSelectParts('destination')?.input.value;
  const firstHotel = hotels.find(hotel => hotel.destination === destinationValue);
  if (!firstHotel) return null;

  setSelectValue('date', firstHotel.dateOfDeparture, firstHotel.dateLabel);
  return firstHotel;
};

export const initStrapiTourForm = async () => {
  const hotels = await getTourHotels();
  if (!hotels.length) return;

  renderSelectOptions('destination', getUniqueBy(hotels, 'destination').map(hotel => ({
    label: hotel.destination,
    value: hotel.destination,
  })));

  renderDateOptions(hotels);

  renderSelectOptions('food', getUniqueBy(hotels, 'typeOfMeal').map(hotel => ({
    label: hotel.typeOfMeal,
    value: hotel.typeOfMeal,
  })));

  const firstHotel = hotels[0];
  setSelectValue('destination', firstHotel.destination);
  renderDateOptions(hotels);
  setSelectValue('date', firstHotel.dateOfDeparture, firstHotel.dateLabel);
  setSelectValue('food', firstHotel.typeOfMeal);

  document.addEventListener('click', event => {
    const option = event.target.closest('[data-select-option]');
    const select = option?.closest('[data-select]');
    if (!option || !select) return;

    queueMicrotask(() => {
      if (select.dataset.select === 'destination') {
        resetSelect('date', 'Выберите дату вылета');
        renderDateOptions(hotels);
        selectFirstAvailableDate(hotels);
      }

      syncFormFromHotel(findSelectedHotel(hotels));
      updateDisabledState();
    });
  });

  syncFormFromHotel(firstHotel);
  updateDisabledState();
};
