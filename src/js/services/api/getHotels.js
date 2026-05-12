import { API_URL } from './constants.js';

const getMediaUrl = media => {
  const data = media?.data || media;
  const item = Array.isArray(data) ? data[0] : data;
  const attrs = item?.attributes || item || {};
  const formats = attrs.formats || {};

  return formats.large?.url || formats.medium?.url || formats.small?.url || attrs.url || null;
};

const normalizeMediaList = media => {
  const data = media?.data || media || [];
  const list = Array.isArray(data) ? data : [data];

  return list
    .filter(Boolean)
    .map(item => {
      const attrs = item.attributes || item;

      return {
        id: item.documentId || item.id,
        name: attrs.name || null,
        alternativeText: attrs.alternativeText || null,
        caption: attrs.caption || null,
        url: getMediaUrl(attrs),
        formats: attrs.formats || null,
      };
    });
};

const richTextToLines = value => {
  const blocks = Array.isArray(value) ? value : [];

  return blocks
    .map(block => {
      const children = Array.isArray(block.children) ? block.children : [];

      return children
        .map(child => child.text || '')
        .join('')
        .trim();
    })
    .filter(Boolean);
};

const normalizeHotelFeatures = features => {
  const list = Array.isArray(features) ? features : [];

  return list.map(feature => ({
    id: feature.id || null,
    title: feature.title || null,
    entries: richTextToLines(feature.entries),
  }));
};

const normalizeHotelDescription = descriptions => {
  const list = Array.isArray(descriptions) ? descriptions : [];

  return list.map(description => ({
    id: description.id || null,
    component: description.__component || null,
    mainDescription: richTextToLines(description.mainDescription),
    description: description.description || null,
  }));
};

export const flattenObject = (value, parentKey = '', result = {}, options = {}) => {
  const { preserveArrayKeys = [] } = options;

  if (value === null || value === undefined) {
    if (parentKey) result[parentKey] = value;
    return result;
  }

  if (Array.isArray(value)) {
    if (preserveArrayKeys.includes(parentKey)) {
      result[parentKey] = value;
      return result;
    }

    if (!value.length && parentKey) result[parentKey] = [];

    value.forEach((item, index) => {
      flattenObject(item, parentKey ? `${parentKey}.${index}` : String(index), result, options);
    });

    return result;
  }

  if (typeof value === 'object') {
    const entries = Object.entries(value);
    if (!entries.length && parentKey) result[parentKey] = {};

    entries.forEach(([key, item]) => {
      if (key === 'raw') return;
      flattenObject(item, parentKey ? `${parentKey}.${key}` : key, result, options);
    });

    return result;
  }

  result[parentKey] = value;
  return result;
};

export const getValueByPath = (object, path) =>
  path.split('.').reduce((value, key) => value?.[key], object);

export const normalizeV2HotelDetails = hotel => {
  const attrs = hotel.attributes || hotel;
  const country = attrs.country?.data?.attributes || attrs.country || null;
  const region = attrs.region?.data?.attributes || attrs.region || null;

  return {
    id: hotel.documentId || hotel.id,
    hotelName: attrs.hotelName || null,
    stars: attrs.stars || null,
    departureCity: attrs.departureCity || null,
    dateOfDeparture: attrs.dateOfDeparture || null,
    season: attrs.season || null,
    isHot: attrs.isHot || false,
    typeOfMeal: attrs.typeOfMeal || null,
    priceForPerson: attrs.priceForPerson || null,
    oldPrice: attrs.oldPrice || null,
    discount: attrs.discount || null,
    tourLineup: attrs.tourLineup || null,
    daysDuration: attrs.daysDuration || null,
    class: attrs.class || null,
    createdAt: attrs.createdAt || null,
    updatedAt: attrs.updatedAt || null,
    publishedAt: attrs.publishedAt || null,
    country,
    region,
    gallery: normalizeMediaList(attrs.gallery),
    hotelFeatures: normalizeHotelFeatures(attrs.hotelFeatures),
    hotelDescription: normalizeHotelDescription(attrs.hotelDescription),
    raw: hotel,
  };
};

export const getHotels = async (limit = 100) => {
  const query = [
    `pagination[pageSize]=${limit}`,
    'sort[0]=hotelName:asc',
    'populate=*',
  ].join('&');

  try {
    const response = await fetch(`${API_URL}v2-hotels?${query}`);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);

    const { data } = await response.json();
    const hotels = (data || []).map(hotel =>
      flattenObject(normalizeV2HotelDetails(hotel), '', {}, {
        preserveArrayKeys: ['gallery', 'hotelFeatures', 'hotelDescription'],
      }),
    );

    return hotels;
  } catch (error) {
    console.error('Ошибка при загрузке v2-hotels:', error);
    return [];
  }
};
