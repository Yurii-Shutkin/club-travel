import { getSeasonTour } from '@/js/services/api/getSeasonTour.js';
import { updateTextContent } from '@/js/utils/update-text-content.js';

export const renderSeasonCards =async (season, className) => {
  const cardsData = await getSeasonTour(season);

  const container = document.querySelector(className);
  const templateWrapper = container.querySelector('[data-template]');
  const templateCard = templateWrapper.content.querySelector('[data-card]');
  const cardsWrapper = container.querySelector('[data-wrapper]');

  if (container.querySelector('.swiper')) {
    templateCard.classList.add('swiper-slide');
  }

  const cardsList =[];
  for (let i=0; i<cardsData.length; i++) {
    const card = templateCard.cloneNode(true);

    const cardImg = card.querySelector('[data-card-img]');

    if (cardImg && cardsData[i].coverImage) {
      cardImg.src = cardsData[i].coverImage;
    }

    updateTextContent(card, '[data-card-location]', cardsData[i].country);
    updateTextContent(card, '[data-card-price]', `${cardsData[i].price}€`);

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
}

