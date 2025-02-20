function searchButtons() {
  var searchQuery = document.getElementById("search-query");
  var buttons = document.querySelectorAll(".button-column .button");

  var latinToRussian = {
    'q': 'й', 'w': 'ц', 'e': 'у', 'r': 'к', 't': 'е', 'y': 'н', 'u': 'г',
    'i': 'ш', 'o': 'щ', 'p': 'з', '[': 'х', ']': 'ъ', 'a': 'ф', 's': 'ы',
    'd': 'в', 'f': 'а', 'g': 'п', 'h': 'р', 'j': 'о', 'k': 'л', 'l': 'д',
    ';': 'ж', '\'': 'э', 'z': 'я', 'x': 'ч', 'c': 'с', 'v': 'м', 'b': 'и',
    'n': 'т', 'm': 'ь', ',': 'б', '.': 'ю', '/': '.'
  };

  function translateToRussian(text) {
    var result = '';
    for (var i = 0; i < text.length; i++) {
      var char = text[i].toLowerCase();
      if (latinToRussian[char]) {
        result += latinToRussian[char];
      } else {
        result += char;
      }
    }
    return result;
  }

  searchQuery.addEventListener('input', function() {
    var query = translateToRussian(this.value.toLowerCase());
    this.value = query;

    for (var i = 0; i < buttons.length; i++) {
      var buttonText = buttons[i].textContent.toLowerCase();
      if (buttonText.indexOf(query) === -1) {
        buttons[i].parentNode.classList.add('hidden');
      } else {
        buttons[i].parentNode.classList.remove('hidden');
        buttons[i].parentNode.insertBefore(buttons[i], buttons[i].parentNode.firstChild.nextSibling);
      }
    }
  });
}
