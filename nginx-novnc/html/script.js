function searchButtons() {
  var query = document.getElementById("search-query").value.toLowerCase();
  var buttons = document.querySelectorAll(".button-column .button");

  for (var i = 0; i < buttons.length; i++) {
    if (buttons[i].textContent.toLowerCase().indexOf(query) === -1) {
      buttons[i].parentNode.classList.add('hidden');
    } else {
      buttons[i].parentNode.classList.remove('hidden');
      buttons[i].parentNode.insertBefore(buttons[i], buttons[i].parentNode.firstChild.nextSibling);
    }
  }
}
