import { getSeasonTour } from '@/js/services/api/getSeasonTour.js';

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
    const cardPrice = card.querySelector('[data-card-price]');
    const cardLocation = card.querySelector('[data-card-location]');

    if (cardImg && cardsData[i].coverImage) cardImg.src = cardsData[i].coverImage;
    if (cardPrice && cardsData[i].country) cardLocation.textContent = cardsData[i].country;
    if (cardLocation && cardsData[i].price) cardPrice.textContent = cardsData[i].price +"€";

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
}

