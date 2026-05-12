import { getSeasonTour } from '@/js/services/api/getSeasonTour.js';
import { updateTextContent } from '@/js/utils/update-text-content.js';

export const renderSeasonCards = async (season, className, maxCards) => {
  const cardsData = await getSeasonTour(season, maxCards);

  const container = document.querySelector(className);
  if (!container) return;
  const templateWrapper = container.querySelector('[data-template]');
  const templateCard = templateWrapper.content.querySelector('[data-card]');
  const cardsWrapper = container.querySelector('[data-wrapper]');

  const cardsList = [];
  const cardsToRender = Math.min(maxCards || cardsData.length, cardsData.length);
  cardsWrapper.innerHTML = '';

  for (let i = 0; i < cardsToRender; i++) {
    const card = templateCard.cloneNode(true);
    if (container.querySelector('.swiper')) card.classList.add('swiper-slide');

    const cardImg = card.querySelector('[data-card-img]');
    const location = [cardsData[i].country, cardsData[i].region].filter(Boolean).join(', ');

    if (cardImg && cardsData[i].coverImage) {
      cardImg.src = cardsData[i].coverImage;
      cardImg.alt = location;
    }

    updateTextContent(card, '[data-card-location]', location || cardsData[i].country);
    updateTextContent(card, '[data-card-price]', `${cardsData[i].price}€`);

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
};
