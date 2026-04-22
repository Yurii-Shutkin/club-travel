import { API_URL, OFFER_POPULATE, HOTEL_POPULATE, REGION_POPULATE, COUNTRY_POPULATE } from './constants.js';

export const getSeasonTour = async (slug) => {
  const query = `?filters[slug][$eq]=${slug}`;
  try {
    const response = await fetch(`${API_URL}categories${query}&` +
      `${OFFER_POPULATE}${HOTEL_POPULATE}${REGION_POPULATE}${COUNTRY_POPULATE}[fields][0]=name&` + 
      `${OFFER_POPULATE}${HOTEL_POPULATE}${REGION_POPULATE}${COUNTRY_POPULATE}[populate][cover][fields][0]=url`);
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
        price: offer.price || null,
        country: hotel.region?.country?.name || null,
        coverImage: hotel.region?.country?.cover?.url || null
      };
    });
    console.log(normalized);
    return normalized;
  } catch (error) {
      console.error(`Ошибка при загрузке категории:`, error);
    return [];
  }
}

