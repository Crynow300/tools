document.getElementById("updateForm").addEventListener("submit", function(event) {
  event.preventDefault();

  var form = event.target;
  var formData = new FormData(form);

  fetch("http://tools.domain.com/add_host", {
    method: "POST",
    body: formData
  })
  .then(function(response) {
    if (response.ok) {
      alert("Файлы успешно обновлены!");
    } else {
      alert("Произошла ошибка при обновлении файлов.");
    }
  })
  .catch(function(error) {
    console.log(error);
    alert("Произошла ошибка при отправке запроса.");
  });
});
