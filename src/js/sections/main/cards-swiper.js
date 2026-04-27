  import Swiper from 'swiper';
  import { Navigation, Autoplay } from 'swiper/modules';
  // import Swiper, { Navigation, Autoplay } from 'swiper';


  export function initCardsSwiper(className, desktopSlides) {
    const sliderWrap = document.querySelector(className);
    if (!sliderWrap) return;
    const sliderEl = sliderWrap.querySelector('.swiper');
    const btnNext = sliderWrap.querySelector('[data-btn-next]');
    const btnPrev = sliderWrap.querySelector('[data-btn-prev]');

    const breakpoints ={};
    if (desktopSlides === 4) {
      breakpoints[450] = { slidesPerView: 1.5 };
      breakpoints[600] = { slidesPerView: 2 };
      breakpoints[750] = { slidesPerView: 2.5 };
      breakpoints[1024] = { slidesPerView: 3 };
      breakpoints[1200] = { slidesPerView: 4 };
    }
    else if (desktopSlides === 3) {
      breakpoints[450] = { slidesPerView: 1.5 };
      breakpoints[600] = { slidesPerView: 2 };
      breakpoints[750] = { slidesPerView: 2.5 };
      breakpoints[1200] = { slidesPerView: 3 };
  }

    if (sliderEl.swiper) return;
    if (sliderEl) {
      new Swiper(sliderEl, {
        modules: [Navigation, Autoplay],

        slidesPerView: 1,
        spaceBetween: 30,
        grabCursor: true,
        loop: true,

        pauseOnMouseEnter: false,
        preventInteractionOnTransition: false,
        speed: 1500,
        autoplay: {
          delay: 4000,
          disableOnInteraction: false,
        },

        navigation: {
          nextEl: btnNext,
          prevEl: btnPrev,
        },

        breakpoints: breakpoints,
      });
    }
  }
