// DOM elements
const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase');
const lowercaseEl = document.getElementById('lowercase');
const numbersEl = document.getElementById('numbers');
const symbolsEl = document.getElementById('symbols');
const generateEl = document.getElementById('generate');
const clipboardEl = document.getElementById('clipboard');

const randomFunc = {
  lower: getRandomLower,
  upper: getRandomUpper,
  number: getRandomNumber,
  symbol: getRandomSymbol,
};

// Generate event listen
generateEl.addEventListener('click', () => {
  const length = +lengthEl.value;
  const hasLower = lowercaseEl.checked;
  const hasUpper = uppercaseEl.checked;
  const hasNumber = numbersEl.checked;
  const hasSymbol = symbolsEl.checked;

  resultEl.innerText = generatePassword(
    hasLower,
    hasUpper,
    hasNumber,
    hasSymbol,
    length
  );
});

// Copy password to clipboard
clipboardEl.addEventListener('click', () => {
  const textarea = document.createElement('textarea');
  const password = resultEl.innerText;

  if (!password) {
    return;
  }

  textarea.value = password;
  document.body.appendChild(textarea);
  textarea.select();
  document.execCommand('copy');
  textarea.remove();
  createAlert();
});

// Generate password function
function generatePassword(lower, upper, number, symbol, length) {
  let generatedPassword = '';

  const typesCount = lower + upper + number + symbol;

  const typesArr = [{ lower }, { upper }, { number }, { symbol }].filter(
    (item) => Object.values(item)[0]
  );

  if (typesCount == 0) {
    return '🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡🤡';
  }

  for (let i = 0; i < length; i++) {
    const rand = Math.floor(Math.random() * typesArr.length);
    generatedPassword += randomFunc[Object.keys(typesArr[rand])[0]]();
  }

  return generatedPassword;
}

// Generator functions
function getRandomLower() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
  return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
  return Math.floor(Math.random() * 10);
}

function getRandomSymbol() {
  const symbols = '!@#$%^&*(){}[]=<>/,.|+-?´`~¤€£";:§';
  return symbols[Math.floor(Math.random() * symbols.length)];
}

// Create alert function
function createAlert() {
  document.getElementById('alert').classList.remove('d-none');
  setTimeout(() => {
    document.getElementById('alert').classList.add('d-none');
  }, 2000);
}
