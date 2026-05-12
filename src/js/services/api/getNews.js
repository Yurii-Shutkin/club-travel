import { API_URL } from './constants.js';

const getImageUrl = media => {
  const data = media?.data || media;
  const item = Array.isArray(data) ? data[0] : data;
  const attrs = item?.attributes || item || {};
  const formats = attrs.formats || {};
  const url = formats.large?.url || formats.small?.url || attrs.url || null;

  if (!url) return null;

  return url.includes('cloudinary.com')
    ? url
      .replace('/upload/', '/upload/f_webp,q_auto/')
      .replace(/\.(png|jpg|jpeg)$/i, '.webp')
    : url;
};

export const normalizeV2Country = country => {
  const attrs = country.attributes || country;
  const hotelsData = attrs.hotels?.data || attrs.hotels || [];
  const hotels = Array.isArray(hotelsData) ? hotelsData : [];
  const prices = hotels
    .map(hotel => {
      const hotelAttrs = hotel.attributes || hotel;
      return hotelAttrs.priceForPerson;
    })
    .filter(price => Number.isFinite(Number(price)));
  const minPrice = prices.length ? Math.min(...prices.map(Number)) : null;

  return {
    id: country.documentId || country.id,
    date: attrs.createdAt
      ? new Date(attrs.createdAt).toLocaleDateString('ru-RU', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).replace(/\s*г\.?$/, '')
      : null,
    countryName: attrs.name || null,
    image: getImageUrl(attrs.cover),
    title: attrs.title || attrs.name || null,
    price: minPrice,
  };
};

export const getNews = async (limit = 12) => {
  const query = [
    'sort[0]=createdAt:desc',
    `pagination[pageSize]=${limit}`,
    'populate[cover][fields][0]=url',
    'populate[cover][fields][1]=formats',
    'populate[hotels][fields][0]=priceForPerson',
    'populate[hotels][sort][0]=priceForPerson:asc',
  ].join('&');

  try {
    const response = await fetch(`${API_URL}v2-countries?${query}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { data } = await response.json();
    if (!data || data.length === 0) return [];

    return data.map(normalizeV2Country);
  } catch (error) {
    console.error('Ошибка при загрузке v2 стран:', error);
    return [];
  }
};
