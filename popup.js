document.addEventListener("DOMContentLoaded", function () {
  const checkbox = document.getElementById("openInNewTab");
  checkbox.checked = JSON.parse(localStorage.getItem("openInNewTab")) || false;

  function updateCheckboxState() {
    localStorage.setItem("openInNewTab", checkbox.checked);
  }
  checkbox.addEventListener("change", updateCheckboxState);

  let listItems = document.querySelectorAll("li");
  let originalContent = document.body.innerHTML; // Сохраняем исходное содержимое страницы

  // Функция для создания кнопки возврата
  function createBackButton() {
    let backButton = document.createElement("button");
    backButton.textContent = "Return to list";
    backButton.onclick = function () {
	  document.body.style.width = "auto"; 
      document.body.innerHTML = originalContent; // Восстанавливаем исходное содержимое
      initializePage(); // Повторно привязываем обработчики событий
    };

    // Устанавливаем стили для кнопки
    backButton.style.position = "absolute"; // Используем абсолютное позиционирование
    backButton.style.top = "0"; // Верхний край
    backButton.style.left = "0"; // Левый край
    backButton.style.backgroundColor = "#242582"; // Цвет фона, такой же как у body
    backButton.style.color = "gold"; // Золотой цвет текста
    backButton.style.padding = "10px"; // Добавляем немного отступа
    backButton.style.cursor = "pointer"; // Курсор в виде указателя
    return backButton;
  }

  // Функция для повторной инициализации страницы
  function initializePage() {
    listItems = document.querySelectorAll("li"); // Обновляем список элементов
    listItems.forEach((li) => {
      li.addEventListener("click", function () {
        let website = this.getAttribute("data-website");

        if (checkbox.checked) {
          window.open(website, '_blank');
        } else {
		  document.body.style.width = "600px"; // Set body width to 600px
          document.body.innerHTML = ""; // Очищаем содержимое body
          var iframe = document.createElement('iframe');
          iframe.setAttribute('src', website);
          iframe.style.width = "100%";
          iframe.style.height = "100vh"; // Занимает весь видимый экран

          document.body.appendChild(iframe);
          document.body.appendChild(createBackButton()); // Добавляем кнопку возврата
        }
      });
    });
  }

  initializePage(); // Вызываем инициализацию страницы при загрузке
});
