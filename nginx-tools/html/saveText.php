<?php
$baseDirectory = $_SERVER['DOCUMENT_ROOT']; // Базовая директория сервера
$currentDirectory = $_SERVER['REQUEST_URI']; // Директория текущей страницы
$currentDirectory = preg_replace('/\?.*/', '', $currentDirectory); // Удаление GET-параметров, если есть
$currentDirectory = preg_replace('/\/$/', '', $currentDirectory); // Удаление слеша, если есть в конце

$fileName = $_POST['fileName'];
$fileContent = $_POST['fileContent'];

// Создание полного пути к файлу
$filePath = $baseDirectory . $currentDirectory . '/' . $fileName;

// Если файл уже существует, получить его содержимое
if (file_exists($filePath)) {
  $previousContent = file_get_contents($filePath); // Получение предыдущего содержимого файла
  $fileContent = $previousContent . "\n" . $fileContent; // Добавление новой записи к предыдущему содержимому
}

// Сохранение файла
file_put_contents($filePath, $fileContent);
?>
