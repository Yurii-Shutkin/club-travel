import { AsYouType } from 'libphonenumber-js';

const phoneInput = document.getElementById('contacts-phone');

phoneInput.addEventListener('input', (e) => {
  const input = e.target;
  let value = input.value;

  if (!value) return;

  let cleaned = value.replace(/[^\d+]/g, '');

  if (cleaned.startsWith('380')) {
      cleaned = '+' + cleaned;
    } else if (cleaned.startsWith('80') && cleaned.length === 11) {
    } else if (cleaned.startsWith('0') && cleaned.length <= 10) {
  }

  const formatter = new AsYouType('UA');
  const formattedValue = formatter.input(cleaned);

  input.value = formattedValue;
});
