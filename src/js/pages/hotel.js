import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import '@/js/sections/main/hero-swiper.js';

import { renderHotCards } from '@/js/components/render-hot-cards.js';
import { initCardsSwiper } from '@/js/sections/main/cards-swiper.js';
import { selectOpen, updateGuestValue } from '@/js/ui/custom-select.js';
import { initCounter } from '@/js/ui/counter.js';
import { innitSwiperThumbs } from '@/js/sections/hotel/swiper-tumbs.js';
import { renderSlides } from '@/js/sections/hotel/render-swiper-thumbs.js';

import { getHotelData } from '@/js/sections/hotel/get-hotel-data.js';
import { renderAboutHotel } from '@/js/sections/hotel/render-about-hotel.js';

document.addEventListener('DOMContentLoaded', async () => {
  selectOpen();
  initCounter();


  document.querySelectorAll('[data-guests-selector]').forEach(guestSelect => {
    updateGuestValue(guestSelect);
  });

  const hotelData = await getHotelData();

  await Promise.all([
    renderSlides(hotelData.gallery).then(() => innitSwiperThumbs('[data-swiper-thumbs]')),
    renderAboutHotel(hotelData.info),

    renderHotCards('.hotel-page__promo-tours', 5).then(() =>
      initCardsSwiper('.hotel-page__promo-tours', 3),
    ),
  ]);
});
