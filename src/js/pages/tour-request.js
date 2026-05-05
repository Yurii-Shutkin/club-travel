import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';
import '@/js/sections/main/hero-swiper.js';

import { initTourSelector } from '@/js/sections/tour-request/tour-selector.js';

document.addEventListener('DOMContentLoaded', async () => {

  await initTourSelector();
});


