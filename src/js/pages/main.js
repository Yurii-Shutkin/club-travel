import '../burger-menu.js';
import '../header-account-dropdown.js';

import { renderNewsCards } from '@/js/components/render-news-cards.js';
import { renderSeasonCards } from '@/js/sections/main/render-season-cards.js';
import { initCardsSwiper } from '@/js/sections/main/cards-swiper.js';


await Promise.all([
  renderNewsCards('.promo-company').then(() =>
    initCardsSwiper('.promo-company', 3),
  ),
  renderSeasonCards('winter', '.promo-winter-tours').then(() =>
    initCardsSwiper('.promo-winter-tours', 4),
  ),
  renderSeasonCards('summer', '.promo-summer-tours').then(() =>
    initCardsSwiper('.promo-summer-tours', 4),
  ),
]);

// await renderNewsCards('.promo-company');
// initCardsSwiper('.promo-company', 3);
//
// await renderSeasonCards('winter', '.promo-winter-tours');
// initCardsSwiper('.promo-winter-tours', 4);
//
// await renderSeasonCards('summer', '.promo-summer-tours');
// initCardsSwiper('.promo-summer-tours', 4);
