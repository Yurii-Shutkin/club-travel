const SCROLLED_CLASS = 'header_scrolled';

function initHeaderScrollState() {
  const header = document.querySelector('.header');

  if (!header) {
    return;
  }

  const updateScrollState = () => {
    const isScrolled = window.scrollY > 0;
    header.classList.toggle(SCROLLED_CLASS, isScrolled);
  };

  updateScrollState();
  window.addEventListener('scroll', updateScrollState, { passive: true });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initHeaderScrollState);
} else {
  initHeaderScrollState();
}
