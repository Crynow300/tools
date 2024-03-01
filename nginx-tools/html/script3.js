function getCurrentDateTime() {
  const currentDate = new Date();
  const dateTimeOptions = { year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
  return currentDate.toLocaleString(undefined, dateTimeOptions);
}

const inputField = document.getElementById('inputField');
const outputField = document.getElementById('outputField');

function handleSubmit(event) {
  event.preventDefault();

  const inputValue = inputField.value;
  const currentDateTime = getCurrentDateTime();

  const fileName = window.location.pathname.replace("/", "") + ".txt"; // Создание имени файла на основе названия страницы с расширением .txt
  const fileContent = `${currentDateTime}: "${inputValue}"`;

  const xhr = new XMLHttpRequest();
  xhr.open("POST", "saveText.php", true); // Замените "saveText.php" на URL серверного скрипта, который будет сохранять файл на сервере

  // Определение типа данных, отправляемых на сервер
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");

  // Отправка данных на сервер
  xhr.send(`fileName=${encodeURIComponent(fileName)}&fileContent=${encodeURIComponent(fileContent)}`);

  const newElement = document.createElement('p');
  newElement.textContent = `${currentDateTime}: "${inputValue}"`;
  outputField.appendChild(newElement);

  inputField.value = '';
}

const form = document.querySelector('form');
form.addEventListener('submit', handleSubmit);
