import { getHotOffers } from '@/js/services/api/getHotOffers.js';
import { formatStringDate } from '@/js/utils/format-string-date.js';
import { updateTextContent } from '@/js/utils/update-text-content.js';

export const renderHotCards = async className => {
  const cardsData = (await getHotOffers()) || [];
  const container = document.querySelector(className);
  if (!container) return;

  const templateWrapper = container.querySelector('[data-template]');
  const templateCard = templateWrapper.content.querySelector('[data-card]');
  const cardsWrapper = container.querySelector('[data-wrapper]');

  if (container.querySelector('.swiper')) {
    templateCard.classList.add('swiper-slide');
  }

  const cardsList = [];
  for (let i = 0; i < cardsData.length; i++) {
    const card = templateCard.cloneNode(true);

    const cardImg = card.querySelector('[data-card-img]');
    const cardOldPrice = card.querySelector('[data-card-old-price]');
    const cardDiscountWrap = card.querySelector('[data-badge]');
    const cardRating = card.querySelector('[data-rating]');
    const starsList = cardRating.querySelectorAll('svg');

    if (cardImg && cardsData[i].coverImage) {
      cardImg.src = cardsData[i].coverImage;
    }

    updateTextContent(card, '[data-card-hotel]', cardsData[i].hotelName);
    updateTextContent(card, '[data-card-date]', formatStringDate(cardsData[i].date));
    updateTextContent(card, '[data-card-location]', cardsData[i].country);

    let price = cardsData[i].price;
    if (cardsData[i].discount && cardDiscountWrap) {
      updateTextContent(cardDiscountWrap, 'span', `-${cardsData[i].discount}%`);
      cardDiscountWrap.classList.add('is-true');

      price = Math.floor(cardsData[i].price *(100- cardsData[i].discount) / 100);

      updateTextContent(card, '[data-card-old-price]', cardsData[i].price);
      cardOldPrice.classList.add('is-true');
    } else {
      cardDiscountWrap.classList.remove('is-true');
      cardOldPrice.classList.remove('is-true');
    }

    updateTextContent(card, '[data-card-price]', price);

    if (cardRating && cardsData[i].stars) {
      for (let j = 0; j < Number(cardsData[i].stars); j++) {
        if (starsList[j]) starsList[j].classList.add('is-true');
      }
    }

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
};
