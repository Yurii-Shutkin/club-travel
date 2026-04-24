import { API_URL} from './constants.js';

export const getNews = async () => {

  try {
    const response = await fetch(`${API_URL}countries?populate=cover`);
    const { data } = await response.json();

    if (!data || data.length === 0) return [];
    const countries = data;
    console.log(countries);
    if (!countries) {
      console.log('Countries не найдено');
      return [];
    }

    const normalized = countries.map((country) => {
      const countryItem = country || {};

      return {
        id: country.id,
        date: new Date(country.createdAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long'
        }) || null,
        countryName: country.name || null,
        image: country.cover?.formats?.large?.url || country.cover?.formats?.small?.url || null,
        title: country.title || null,
      };
    });
    console.log(normalized);
    return normalized;
  } catch (error) {
      console.error(`Ошибка при загрузке категории:`, error);
    return [];
  }
}


