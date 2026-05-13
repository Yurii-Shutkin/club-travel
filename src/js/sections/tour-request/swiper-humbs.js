import Swiper from 'swiper';
import { FreeMode, Thumbs } from 'swiper/modules';

export function innitSwiperThumbs() {
  const swiperThumbs = document.querySelectorAll('[data-swiper-thumbs]');

  swiperThumbs.forEach(swiperWithThumbs => {
    const mainSwiper = swiperWithThumbs.querySelector(
      '[data-swiper-thumbs-main]',
    );
    const listSwiper = swiperWithThumbs.querySelector(
      '[data-swiper-thumbs-list]',
    );

    if (!mainSwiper || !listSwiper) {
      return;
    }

    const slides = mainSwiper.querySelectorAll('.swiper-slide');

    if (slides.length === 0) {
      return;
    }

    const thumbsSwiper = new Swiper(listSwiper, {
      modules: [FreeMode],
      slidesPerView: 4,
      spaceBetween: 16,
      freeMode: true,
      loop: true,
      watchSlidesProgress: true,
      breakpoints: {
        0: {
          spaceBetween: 8,
        },
        769: {
          spaceBetween: 12,
        },
      },
    });

    new Swiper(mainSwiper, {
      modules: [Thumbs],
      slidesPerView: 1,
      spaceBetween: 10,
      speed: 500,
      loop: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  });
}
