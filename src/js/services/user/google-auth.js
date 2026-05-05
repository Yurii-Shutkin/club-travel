const API_URL = 'https://club-travel-strapi.onrender.com';
export async function handleGoogleCallback() {
  const queryString = window.location.search || window.location.hash.substring(window.location.hash.indexOf('?'));
  const urlParams = new URLSearchParams(queryString);
  
  const accessToken = urlParams.get('access_token');
  
  console.log('Текущий URL:', window.location.href);
  console.log('Найденный токен:', accessToken);

  if (accessToken) {
    try {
      console.log('Отправка запроса на Strapi...');
      const response = await fetch(`${API_URL}/api/auth/google/callback?access_token=${accessToken}`);
      const data = await response.json();

      if (data.jwt) {
        localStorage.setItem('jwt', data.jwt);
        localStorage.setItem('user', JSON.stringify(data.user));

        alert('Вход выполнен!');
        
        window.location.href = window.location.origin + window.location.pathname;
      }
    } catch (err) {
      console.error('Ошибка при обращении к Strapi:', err);
    }
  }
}
