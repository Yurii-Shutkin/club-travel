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
      const originalUrl = country.cover?.formats?.large?.url || country.cover?.formats?.small?.url || null;
      const optimizedImage = originalUrl && originalUrl.includes('cloudinary.com')
        ? originalUrl.replace('/upload/', '/upload/f_webp,q_auto/')
        .replace(/\.(png|jpg|jpeg)$/, '.webp') 
        : originalUrl;

      return {
        id: country.id,
        date: new Date(country.createdAt).toLocaleDateString('ru-RU', {
          day: 'numeric',
          month: 'long',
          year: 'numeric'
        }).replace(/\s*г\.?$/, '') || null,
        countryName: country.name || null,
        image: optimizedImage,
        title: country.title || null,
        price: country.price || null,
      };
    });
    console.log(normalized);
    return normalized;
  } catch (error) {
      console.error(`Ошибка при загрузке категории:`, error);
    return [];
  }
}

