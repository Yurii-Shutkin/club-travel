const signupForm = document.getElementById('form');

export async function handleSignUp(form) {
  const email = form.querySelector('#email').value;
  const password = form.querySelector('#password').value;
  const passwordConfirm = form.querySelector('#password-confirm').value;

  if (password !== passwordConfirm) {
    alert('Пароли не совпадают!');
    return;
  }

  const response = await fetch('https://club-travel-strapi.onrender.com/api/auth/local/register', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username: email, 
      email: email,
      password: password,
    }),
  });

  const data = await response.json();

  if (data.jwt) {
    alert('Аккаунт создан!');
    localStorage.setItem('jwt', data.jwt);
    window.location.href = 'account.html';
  } else {
    alert('Ошибка при регистрации: ' + data.error.message);
  }
}
