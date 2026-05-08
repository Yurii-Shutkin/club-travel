export async function handleLogin(form) {
  const email = form.querySelector('#email').value;
  const password = form.querySelector('#password-login').value;

  const response = await fetch('https://club-travel-strapi.onrender.com/api/auth/local', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      identifier: email, 
      password: password,
    }),
  });

  const data = await response.json();

  if (data.jwt) {
    localStorage.setItem('jwt', data.jwt);
    localStorage.setItem('user', JSON.stringify(data.user));
    window.location.href = 'account.html'; 
  } else {
    alert('Неверный логин или пароль');
  }
}
