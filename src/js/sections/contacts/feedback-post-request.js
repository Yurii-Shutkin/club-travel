const feedbackForm = document.querySelector('[data-contacts-form]');

const nameInput = feedbackForm.querySelector('#contacts-name');
const phoneInput = feedbackForm.querySelector('#contacts-phone');
const emailInput = feedbackForm.querySelector('#contacts-email');
const messageInput = feedbackForm.querySelector('#contacts-message');

const postData = {
  name: null,
  phone: null,
  email: null,
  message: null,
}

const postFeedback = async (data) => {
  try {
    const response = await fetch('https://club-travel-strapi.onrender.com/api/feedbacks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const result = await response.json();
    feedbackForm.reset();
    console.log('Feedback submitted successfully:', result);
  } catch (error) {
    console.error('Error submitting feedback:', error);
  }
}

feedbackForm.addEventListener('submit', (e) => {
  e.preventDefault();
  postData.name = nameInput.value;
  postData.phone = phoneInput.value;
  postData.email = emailInput.value;
  postData.message = messageInput.value;
  postFeedback(postData);
});
