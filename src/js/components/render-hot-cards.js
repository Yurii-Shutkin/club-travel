import { getHotOffers } from '@/js/services/api/getHotOffers.js';
import { updateTextContent } from '@/js/utils/update-text-content.js';

export const renderHotCards = async (className, maxCards) => {
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
  const cardsToRender = Math.min(maxCards || cardsData.length, cardsData.length);
  for (let i = 0; i < cardsToRender; i++) {
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
    updateTextContent(card, '[data-card-date]', cardsData[i].date);
    updateTextContent(card, '[data-card-location]', `${cardsData[i].country}, ${cardsData[i].region}`);


    if (cardsData[i].discount) {
      updateTextContent(cardDiscountWrap, 'span', `-${cardsData[i].discount}%`);
      cardDiscountWrap.classList.add('is-true');
    }

    if (cardsData[i].oldPrice) {
      updateTextContent(
        card, '[data-card-old-price]', `${cardsData[i].oldPrice}€/чел`,
      );
      cardOldPrice.classList.add('is-true');
    }

    updateTextContent(card, '[data-card-price]', cardsData[i].price);

    if (cardRating && cardsData[i].stars) {
      for (let j = 0; j < Number(cardsData[i].stars); j++) {
        if (starsList[j]) starsList[j].classList.add('is-true');
      }
    }

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
};
