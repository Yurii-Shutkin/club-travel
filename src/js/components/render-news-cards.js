import { getNews } from '@/js/services/api/getNews.js';
import { updateTextContent } from '@/js/utils/update-text-content.js';

export const renderNewsCards = async (className, maxCards) => {
  const cardsData = await getNews();

  const container = document.querySelector(className);
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
    const cardPriceWrap = card.querySelector('[data-badge]');
    const cardDateWrap = card.querySelector('[data-card-date]');

    if (cardImg && cardsData[i].image) cardImg.src = cardsData[i].image;

    updateTextContent(card, '[data-card-title]', cardsData[i].title);

    if (cardPriceWrap && cardsData[i].price) {
      updateTextContent(cardPriceWrap, 'span', `от ${cardsData[i].price}€`);
      cardPriceWrap.classList.add('has-price');
    } else cardPriceWrap.classList.remove('has-price');

    if (cardDateWrap && cardsData[i].date) {
      updateTextContent(cardDateWrap, 'span', cardsData[i].date);
      cardDateWrap.classList.add('has-date');
    } else cardDateWrap.classList.remove('has-date');

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
};
