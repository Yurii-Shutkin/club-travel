import { getNews } from '@/js/services/api/getNews.js';
import { formatStringDate } from '@/js/utils/format-string-date.js';

export const renderNewsCards = async className => {
  const cardsData = await getNews();

  const container = document.querySelector(className);
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
    const cardPriceWrap = card.querySelector('[data-card-price]');
    const cardPrice = cardPriceWrap.querySelector('span');
    const cardTitle = card.querySelector('[data-card-title]');
    const cardDateWrap = card.querySelector('[data-card-date]');
    const cardDate = cardDateWrap.querySelector('span');

    if (cardImg && cardsData[i].image) cardImg.src = cardsData[i].image;
    if (cardTitle && cardsData[i].title)
      cardTitle.textContent = cardsData[i].title;

    if (cardPriceWrap && cardPrice && cardsData[i].price) {
      cardPrice.textContent = cardsData[i].price;
      cardPriceWrap.classList.add('has-price');
    } else cardPriceWrap.classList.remove('has-price');

    if (cardDateWrap && cardDate && cardsData[i].date) {
      cardDate.textContent = formatStringDate(cardsData[i].date);
      cardDateWrap.classList.add('has-date');
    } else cardDateWrap.classList.remove('has-date');

    cardsList.push(card);
  }
  cardsWrapper.append(...cardsList);
};
