import '../burger-menu.js';
import '../header-account-dropdown.js';
import '../header-scroll-state.js';

import { renderNewsCards } from '@/js/components/render-news-cards.js';

document.addEventListener('DOMContentLoaded', async () => {
  await renderNewsCards('.news');
});
