import JustValidate from 'just-validate';
import { handleSignUp } from '@/js/services/user/on-sign-up.js';
import { handleLogin } from '@/js/services/user/mail-pass-auth.js';

export const initValidation = (formSelector) => {
  const form = document.querySelector(formSelector);
  const passwordField = document.querySelector('#password'); 
  
  if (!form) return null;

  const validator = new JustValidate(formSelector, {
    errorFieldCssClass: 'input-base_is-invalid',
    successFieldCssClass: 'input-base_is-valid',
    lockForm: true,
  });

  if (document.querySelector('#email')) {
    validator.addField('#email', [
      { rule: 'required', errorMessage: 'Укажите ваш Email' },
      { rule: 'email', errorMessage: 'Укажите корректный Email!' },
    ]);
  }

  if (document.querySelector('#password')) {
    validator.addField('#password', [
      { rule: 'required', errorMessage: 'Укажите пароль' },
      { 
        rule: 'strongPassword', 
        errorMessage: 'Пароль должен содержать заглавную букву, цифру и спецсимвол' 
      },
    ]);
  }

  if (document.querySelector('#password-login')) {
    validator.addField('#password-login', [
      { rule: 'required',
        errorMessage: 'Укажите пароль' },
      { 
        rule: 'minLength', 
        value: 8,
        errorMessage: `Пароль должен содержать минимум 8 символов`
      }
    ]);
  }

  if (document.querySelector('#password') && document.querySelector('#password-confirm')) {
    validator.addField('#password-confirm', [
    {
      rule: 'required',
      errorMessage: 'Повторите пароль',
    },
    {
      validator: (value) => {
        return value === passwordField.value;
      },
      errorMessage: 'Пароли не совпадают',
    },
  ]);
  }

  if (document.querySelector('#contacts-name')) {
    validator.addField('#contacts-name', [
      {
        rule: 'maxLength', 
        value: 15,
        errorMessage: 'Имя должно быть не длиннее 15 символов',
      },
    ]);
  }

  if (document.querySelector('#contacts-phone')) {
    validator.addField('#contacts-phone', [
      {
        rule: 'required',
        errorMessage: 'Укажийте номер телефона',
      },
      {
        rule: 'customRegexp',
        value: /^[+]?[0-9]{10,15}$/,
        errorMessage: 'Неверный формат телефона',
      },
    ]);
  }

  if (document.querySelector('#contacts-email')) {
    validator.addField('#contacts-email', [
      {
        rule: 'required',
        errorMessage: 'Укажийте Email',
      },
      {
        rule: 'email',
        errorMessage: 'Укажийте корректный Email',
      },
      { rule: 'maxLength',
        value: 50,
        errorMessage: 'Максимальная длина Email 50 символов',
      }
    ]);
  }

  if (document.querySelector('#contacts-message')) {
    validator.addField('#contacts-message', [
      {
        maxLength: 500,
        errorMessage: 'Максимальная длина сообщения 300 символов',
      },
    ]);
  }

  validator.onSuccess(async (event) => {
    const form = event.target;
    const formType = form.getAttribute('data-form'); 
    if (formType === 'signup') {
        await handleSignUp(form);
    }

    else if (formType === 'auth') {
        await handleLogin(form);
    }
    console.log('Форма валидна, можно отправлять!', event.target);
  });
  
  return validator; 
};
