import { API_URL } from './constants.js';
import { getImageUrl, normalizeV2Hotel } from './getHotOffers.js';

const HOTEL_POPULATE_QUERY = [
  'populate[region][populate][cover][fields][0]=url',
  'populate[country]=true',
].join('&');

const normalizeSeasonHotel = hotel => {
  const normalized = normalizeV2Hotel(hotel);
  const attrs = hotel.attributes || hotel;
  const region = attrs.region?.data?.attributes || attrs.region || {};

  return {
    ...normalized,
    coverImage: getImageUrl(region.cover),
  };
};

export const getSeasonTour = async (season, limit = 12) => {
  const seasonValue = encodeURIComponent(season);
  const query = [
    `filters[season][$eq]=${seasonValue}`,
    'sort[0]=priceForPerson:asc',
    'sort[1]=dateOfDeparture:asc',
    `pagination[pageSize]=${limit}`,
    HOTEL_POPULATE_QUERY,
  ].join('&');

  try {
    const response = await fetch(`${API_URL}v2-hotels?${query}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { data } = await response.json();
    if (!data || data.length === 0) return [];

    return data
      .map(normalizeSeasonHotel)
      .filter(hotel => hotel.season === season);
  } catch (error) {
    console.error(`Ошибка при загрузке ${season} туров:`, error);
    return [];
  }
};
