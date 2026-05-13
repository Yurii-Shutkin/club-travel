const API_URL = 'https://club-travel-strapi.onrender.com';
import { links } from '@/data/links.js';

const googleButton = document.querySelector('.btn__social_google');

// 1. ЛОГИКА ОБРАБОТКИ (срабатывает автоматически при загрузке страницы)
async function handleGoogleCallback() {
  // Проверяем наличие токена в URL
  const queryString = window.location.search || window.location.hash.substring(window.location.hash.indexOf('?'));
  const urlParams = new URLSearchParams(queryString);
  const accessToken = urlParams.get('access_token');

  if (accessToken) {
    try {
      document.body.style.opacity = '0'; 
      // Чтобы пользователь не видел "дерганье" главной страницы, можно скрыть контент

      const response = await fetch(`${API_URL}/api/auth/google/callback?access_token=${accessToken}`);
      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));
        
        window.location.replace(links.customerAccount.href);
      }
    } catch (err) {
      console.error('Ошибка авторизации:', err);
      document.body.style.opacity = '1';
    }
  }
}

if (googleButton) {
  googleButton.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = `${API_URL}/api/connect/google`;
  });
}

handleGoogleCallback();
