import {
  clearAllBodyScrollLocks,
  disableBodyScroll,
  enableBodyScroll,
} from 'body-scroll-lock';

const openButton = document.querySelector('.js-burger-open');
const burgerMenu = document.querySelector('.js-burger-menu');
const closeButton = document.querySelector('.js-burger-close');

if (openButton && burgerMenu && closeButton) {
  const desktopMediaQuery = window.matchMedia('(min-width: 1366px)');
  const dialog = burgerMenu.querySelector('.burger-menu__dialog');
  const scrollLockTarget = dialog ?? burgerMenu;

  const lockBodyScroll = () => {
    disableBodyScroll(scrollLockTarget, { reserveScrollBarGap: true });
  };

  const unlockBodyScroll = () => {
    enableBodyScroll(scrollLockTarget);
  };

  const openMenu = () => {
    burgerMenu.classList.add('is-open');
    burgerMenu.setAttribute('aria-hidden', 'false');
    openButton.setAttribute('aria-expanded', 'true');
    lockBodyScroll();
    closeButton.focus();
  };

  const closeMenu = () => {
    if (burgerMenu.contains(document.activeElement)) {
      openButton.focus();
    }

    burgerMenu.classList.remove('is-open');
    burgerMenu.setAttribute('aria-hidden', 'true');
    openButton.setAttribute('aria-expanded', 'false');
    unlockBodyScroll();
  };

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);

  burgerMenu.addEventListener('click', event => {
    if (!burgerMenu.classList.contains('is-open')) return;

    if (dialog && !dialog.contains(event.target)) {
      closeMenu();
    }
  });

  const closeMenuIfOpen = () => {
    if (burgerMenu.classList.contains('is-open')) {
      closeMenu();
    }
  };

  window.addEventListener('resize', closeMenuIfOpen);

  const handleDesktopChange = event => {
    if (event.matches) {
      closeMenuIfOpen();
    }
  };

  if (typeof desktopMediaQuery.addEventListener === 'function') {
    desktopMediaQuery.addEventListener('change', handleDesktopChange);
  } else {
    desktopMediaQuery.addListener(handleDesktopChange);
  }

  window.addEventListener('pagehide', clearAllBodyScrollLocks);
}
