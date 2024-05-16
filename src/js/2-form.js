import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';

const formData = { email: '', message: '' };
const STORAGE_KEY = 'feedback-form-state';

const formEl = document.querySelector('.feedback-form');

renderPage();

formEl.addEventListener('submit', event => {
  event.preventDefault();
  if (validateForm()) {
    return;
  }
  const enteredData = new FormData(formEl);
  formData.email = enteredData.get('email').trim();
  formData.message = enteredData.get('message').trim();

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  event.target.reset();
});

formEl.addEventListener('input', () => {
  const enteredData = new FormData(formEl);
  formData.email = enteredData.get('email').trim();
  formData.message = enteredData.get('message').trim();
  writeToLS(STORAGE_KEY, formData);
});

//========

function validateForm() {
  const enteredData = new FormData(formEl);
  if (
    enteredData.get('email').trim() === '' ||
    enteredData.get('message').trim() === ''
  ) {
    iziToast.show({
      message: 'Fill please all fields',
      color: 'red',
      timeout: 10000,
      displayMode: 'replace',
    });
    return true;
  }
}

function writeToLS(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

function readFromLS(key) {
  const data = localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (error) {
    console.log(error);
  }
}

function renderPage() {
  const preEnteredData = readFromLS(STORAGE_KEY) || {};
  formEl.elements.email.value = preEnteredData.email || '';
  formEl.elements.message.value = preEnteredData.message || '';
}
