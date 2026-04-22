import { API_URL, OFFER_POPULATE, HOTEL_POPULATE, REGION_POPULATE, COUNTRY_POPULATE } from './constants.js';

export const getHotOffers = async () => {
  const query = '?filters[slug][$eq]=hot-order';
  try {
    const response = await fetch(`${API_URL}categories${query}&` +
      `${OFFER_POPULATE}${HOTEL_POPULATE}[fields][0]=name&` +
      `${OFFER_POPULATE}${HOTEL_POPULATE}[fields][1]=stars&` +
      `${OFFER_POPULATE}${HOTEL_POPULATE}[populate][main][fields]=url&` +
      `${OFFER_POPULATE}${HOTEL_POPULATE}${REGION_POPULATE}${COUNTRY_POPULATE}[fields][0]=name`);
    const { data } = await response.json();

    if (!data || data.length === 0) return [];
    const category = data[0];
    if (!category || !category.offers) {
      console.log('Нет offers');
      return [];
    }

    const normalized = category.offers.map((offer) => {
      const hotel = offer.hotel || {};

      return {
        id: offer.id,
        date: new Date(offer.date).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long'
        }) || null,
        hotelName: hotel.name || null,
        price: offer.price || null,
        stars: hotel.stars || null,
        coverImage: hotel.main?.url || null,
        country: hotel.region?.country?.name || null
      };
    });
    console.log(normalized);
    return normalized;
  } catch (error) {
      console.error(`Ошибка при загрузке категории:`, error);
    return [];
  }
}


