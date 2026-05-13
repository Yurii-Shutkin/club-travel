import { auth } from '@/js/services/user/auth.js';

const DESKTOP_BREAKPOINT = 1366;
const AUTH_STORAGE_KEY = 'club-travel-mock-auth-state';
const DEFAULT_AUTH_STATE = 'authorized';

const MOCK_AUTH_USER = {
  id: 1,
  firstName: 'Еле',
  lastName: 'Колонаева',
  email: 'admin@admin.ee',
  avatar: null,
};

function getMockAuthState() {
  return sessionStorage.getItem(AUTH_STORAGE_KEY) || DEFAULT_AUTH_STATE;
}

function setMockAuthState(state) {
  sessionStorage.setItem(AUTH_STORAGE_KEY, state);
}

function getMockCurrentUser() {
  return getMockAuthState() === 'authorized' ? MOCK_AUTH_USER : null;
}

function getUserInitials(user) {
  const firstInitial = user?.firstName?.trim()?.charAt(0) || '';
  const lastInitial = user?.lastName?.trim()?.charAt(0) || '';

  return `${firstInitial}${lastInitial}`.toUpperCase();
}

function initHeaderAccountDropdown() {
  const accountMenu = document.querySelector('.header__account-menu');

  if (!accountMenu) {
    return;
  }

  const accountButton = accountMenu.querySelector('.header__account');
  const accountDropdown = accountMenu.querySelector(
    '.header__account-dropdown',
  );
  const accountInitials = accountMenu.querySelector(
    '.header__account-initials',
  );
  const logoutLink = accountMenu.querySelector('.header__account-logout');

  if (!accountButton || !accountDropdown || !accountInitials || !logoutLink) {
    return;
  }

  const authUrl = accountButton.dataset.authUrl || 'main.html';
  const accountUrl = accountButton.dataset.accountUrl || 'main.html';

  const isDesktop = () => window.innerWidth >= DESKTOP_BREAKPOINT;

  const closeDropdown = () => {
    accountMenu.classList.remove('header__account-menu_open');
    accountButton.setAttribute('aria-expanded', 'false');
    accountDropdown.setAttribute('aria-hidden', 'true');
  };

  const openDropdown = () => {
    accountMenu.classList.add('header__account-menu_open');
    accountButton.setAttribute('aria-expanded', 'true');
    accountDropdown.setAttribute('aria-hidden', 'false');
  };

  const setGuestState = () => {
    accountMenu.classList.remove(
      'header__account-menu_authorized',
      'header__account-menu_open',
    );
    accountMenu.classList.add('header__account-menu_guest');

    accountInitials.textContent = '';
    accountButton.setAttribute('aria-expanded', 'false');
    accountDropdown.setAttribute('aria-hidden', 'true');
  };

  const setAuthorizedState = user => {
    accountMenu.classList.remove('header__account-menu_guest');
    accountMenu.classList.add('header__account-menu_authorized');

    accountInitials.textContent = getUserInitials(user);
    closeDropdown();
  };

  const renderHeaderAccountState = () => {
    const currentUser = getMockCurrentUser();

    if (currentUser) {
      setAuthorizedState(currentUser);
      return;
    }

    setGuestState();
  };

  accountButton.addEventListener('click', event => {
    event.preventDefault();

    const currentUser = getMockCurrentUser();

    if (!currentUser) {
      window.location.href = authUrl;
      return;
    }

    if (!isDesktop()) {
      window.location.href = accountUrl;
      return;
    }

    if (accountMenu.classList.contains('header__account-menu_open')) {
      closeDropdown();
      return;
    }

    openDropdown();
  });

  logoutLink.addEventListener('click', event => {
    event.preventDefault();

    setMockAuthState('guest');
    renderHeaderAccountState();
    auth.logout();
  });

  document.addEventListener('click', event => {
    if (!accountMenu.contains(event.target)) {
      closeDropdown();
    }
  });

  document.addEventListener('keydown', event => {
    if (event.key === 'Escape') {
      closeDropdown();
    }
  });

  window.addEventListener('resize', () => {
    if (!isDesktop()) {
      closeDropdown();
    }
  });

  renderHeaderAccountState();

  window.clubTravelMockAuth = {
    login() {
      setMockAuthState('authorized');
      renderHeaderAccountState();
    },
    logout() {
      setMockAuthState('guest');
      renderHeaderAccountState();
    },
    getState() {
      return getMockAuthState();
    },
  };
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderAccountDropdown);
} else {
  initHeaderAccountDropdown();
}
