import { API_URL } from './constants.js';

const HOTEL_POPULATE_QUERY = [
  'populate[region][populate][cover][fields][0]=url',
  'populate[country]=true',
].join('&');

export const getImageUrl = media => {
  const data = media?.data || media;
  const item = Array.isArray(data) ? data[0] : data;
  const attrs = item?.attributes || item || {};

  if (!attrs.url) return null;

  return attrs.url.includes('cloudinary.com')
    ? attrs.url
      .replace('/upload/', '/upload/f_webp,q_auto/')
      .replace(/\.(png|jpg|jpeg)$/i, '.webp')
    : attrs.url;
};

export const normalizeV2Hotel = hotel => {
  const attrs = hotel.attributes || hotel;
  const country = attrs.country?.data?.attributes || attrs.country || {};
  const region = attrs.region?.data?.attributes || attrs.region || {};

  return {
    id: hotel.documentId || hotel.id,
    hotelName: attrs.hotelName || null,
    season: attrs.season || null,
    stars: attrs.stars || null,
    date: attrs.dateOfDeparture
      ? new Date(attrs.dateOfDeparture).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).replace(/\s*г\.?$/, '')
      : null,
    price: attrs.priceForPerson || null,
    oldPrice: attrs.oldPrice || null,
    discount: attrs.discount || null,
    country: country.name || null,
    region: region.name || null,
    coverImage: getImageUrl(region.cover),
  };
};

export const getHotOffers = async (limit = 12) => {
  const query = [
    'filters[isHot][$eq]=true',
    'sort[0]=dateOfDeparture:asc',
    `pagination[pageSize]=${limit}`,
    HOTEL_POPULATE_QUERY,
  ].join('&');

  try {
    const response = await fetch(`${API_URL}v2-hotels?${query}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { data } = await response.json();
    if (!data || data.length === 0) return [];

    return data.map(normalizeV2Hotel);
  } catch (error) {
    console.error('Ошибка при загрузке горящих туров:', error);
    return [];
  }
};
