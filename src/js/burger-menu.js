const openButton = document.querySelector('.js-burger-open');
const burgerMenu = document.querySelector('.js-burger-menu');
const closeButton = document.querySelector('.js-burger-close');

if (openButton && burgerMenu && closeButton) {
  const desktopMediaQuery = window.matchMedia('(min-width: 1366px)');

  const openMenu = () => {
    burgerMenu.classList.add('is-open');
    burgerMenu.setAttribute('aria-hidden', 'false');
    openButton.setAttribute('aria-expanded', 'true');
    document.body.classList.add('burger-menu-open');
  };

  const closeMenu = () => {
    burgerMenu.classList.remove('is-open');
    burgerMenu.setAttribute('aria-hidden', 'true');
    openButton.setAttribute('aria-expanded', 'false');
    document.body.classList.remove('burger-menu-open');
  };

  openButton.addEventListener('click', openMenu);
  closeButton.addEventListener('click', closeMenu);

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
}
