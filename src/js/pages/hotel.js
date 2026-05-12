import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import '@/js/sections/main/hero-swiper.js';

import { renderHotCards } from '@/js/components/render-hot-cards.js';
import { initCardsSwiper } from '@/js/sections/main/cards-swiper.js';
// import { handleGoogleCallback } from '@/js/services/user/auth.js';
import { selectOpen, updateGuestValue } from '@/js/ui/custom-select.js';
import { initCounter } from '@/js/ui/counter.js';
import { innitSwiperThumbs } from '@/js/sections/tour-request/swiper-humbs.js';



document.addEventListener('DOMContentLoaded', async () => {
  selectOpen();
  initCounter();
  innitSwiperThumbs();

  document.querySelectorAll('[data-guests-selector]').forEach((guestSelect) => {
    updateGuestValue(guestSelect);
  });

  await Promise.all([
    // handleGoogleCallback(),

    renderHotCards('.hotel-page__promo-tours',5).then(() =>
      initCardsSwiper('.hotel-page__promo-tours', 3),
    ),
  ]);
});

import { getHotels } from '@/js/services/api/getHotels.js';

const hotels = await getHotels(50);
console.log('hotels', hotels);



