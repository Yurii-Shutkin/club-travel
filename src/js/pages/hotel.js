import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import '@/js/sections/main/hero-swiper.js';

import { renderNewsCards } from '@/js/components/render-news-cards.js';
import { renderHotCards } from '@/js/components/render-hot-cards.js';
import { renderSeasonCards } from '@/js/sections/main/render-season-cards.js';
import { initCardsSwiper } from '@/js/sections/main/cards-swiper.js';
import { handleGoogleCallback } from '@/js/services/user/auth.js';



document.addEventListener('DOMContentLoaded', async () => {
  await Promise.all([
    handleGoogleCallback(),

    renderNewsCards('.promo-company',5).then(() =>
      initCardsSwiper('.promo-company', 3),
    ),
    renderHotCards('.promo-offers',5).then(() =>
      initCardsSwiper('.promo-offers', 3),
    ),
    renderSeasonCards('winter', '.promo-winter-tours').then(() =>
      initCardsSwiper('.promo-winter-tours', 4),
    ),
    renderSeasonCards('summer', '.promo-summer-tours').then(() =>
      initCardsSwiper('.promo-summer-tours', 4),
    ),
  ]);
});


import Swiper from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';

const swipersWithThumbs = document.querySelectorAll('.js-swiper-thumbs');

swipersWithThumbs.forEach((swiperWithThumbs) => {
  const mainElement = swiperWithThumbs.querySelector('.js-swiper-thumbs-main');
  const thumbsElement = swiperWithThumbs.querySelector('.js-swiper-thumbs-nav');

  if (!mainElement || !thumbsElement) {
    return;
  }

  const slides = mainElement.querySelectorAll('.swiper-slide');

  if (slides.length === 0) {
    return;
  }

  const thumbsSwiper = new Swiper(thumbsElement, {
    modules: [FreeMode],
    slidesPerView: 4,
    spaceBetween: 12,
    freeMode: true,
    watchSlidesProgress: true,
    breakpoints: {
      0: {
        spaceBetween: 8,
      },
      769: {
        spaceBetween: 12,
      },
    },
  });

  new Swiper(mainElement, {
    modules: [Thumbs],
    slidesPerView: 1,
    spaceBetween: 0,
    speed: 500,
    thumbs: {
      swiper: thumbsSwiper,
    },
  });
});
