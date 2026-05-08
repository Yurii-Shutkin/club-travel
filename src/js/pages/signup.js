import '@/js/layout/burger-menu.js';
import '@/js/layout/header-account-dropdown.js';
import '@/js/layout/header-scroll-state.js';

import { initGuard } from '@/js/services/user/guard.js';

initGuard();
import { initValidation } from '../services/formValidation.js';

initValidation('#form');

