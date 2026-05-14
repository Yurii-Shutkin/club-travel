import Swiper from 'swiper';
import { FreeMode, Thumbs} from 'swiper/modules';

export function innitSwiperThumbs(SwiperThumbsClass) {
  const swiperThumbs = document.querySelectorAll(SwiperThumbsClass);

  swiperThumbs.forEach(swiperWithThumbs => {
    const mainSwiper = swiperWithThumbs.querySelector(
      '[data-swiper-main]',
    );
    const listSwiper = swiperWithThumbs.querySelector(
      '[data-swiper-list]',
    );

    if (!mainSwiper || !listSwiper) {
      return;
    }

    const slides = mainSwiper.querySelectorAll('.swiper-slide');

    if (slides.length === 0) {
      return;
    }
    const isLoop = slides.length > 4;

    const thumbsSwiper = new Swiper(listSwiper, {
      modules: [FreeMode, Thumbs],
      slidesPerView: 4,
      spaceBetween: 16,
      freeMode: true,
      loop: isLoop,
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
      grabCursor: true,
      thumbs: {
        swiper: thumbsSwiper,
      },
    });
  });
}
