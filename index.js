const fs = require("fs/promises"); // Подключаем встроенную библиотеку работы с файловой системой
const path = require("path"); // Подключаем встроенную библиотеку нормализации путей к файлам

const numbersPath = path.join("10m.txt"); // Подключаем файл

async function listNumbers() {
  return await fs.readFile(numbersPath, "utf-8"); // Считываем файл и приводим его к строке в формате UTF-8
}

const findValues = (data) => {
  const numbersArr = data
    .split(/[^-0-9]/) // Превращаем данные в массив разбив строку по всем символам кроме "-" и чисел
    .filter((elem) => elem.trim()) // Обрезаем пустые символы элементов массива
    .filter((elem) => isFinite(elem)) // Удаляем елементы массива "-" ("минус" без цифр)
    .map((elem) => parseInt(elem)); // Приводим елементы массива к числу
  const sortNumbers = [...numbersArr].sort((a, b) => a - b); // Сортируем массив по возрастанию

  console.log(
    "Максимальное число в файле: ",
    sortNumbers[sortNumbers.length - 1] // Выбираем последний елемент массива
  );

  console.log("Минимальное число в файле: ", sortNumbers[0]); // Выбираем первый елемент массива

  const median =
    sortNumbers.length % 2 === 0 // Определяем чётность длины массива
      ? (sortNumbers[sortNumbers.length / 2 - 1] +
          sortNumbers[sortNumbers.length / 2]) /
        2 // Чётное значение - суммируем два серединных елемента и делим пополам
      : sortNumbers[(sortNumbers.length - 1) / 2]; // Нечётное значение - выводим серединный елемент
  console.log("Медиана: ", median);

  const arithmeticMean =
    numbersArr.reduce((acc, elem) => acc + elem, 0) / sortNumbers.length; // Суммируем все элементы и делим на длину массива
  console.log("Среднее арифметическое значение: ", arithmeticMean);

  const ascendingSequence = () => {
    let sequenceArr = []; // Создаём массив значений идущих подряд чисел
    let sequence = 0; // Создаём счётчик значения отдельной последовательности

    [...numbersArr].sort((a, b) => {
      if (a > b) {
        sequence++; // Если число больше предыдущего - увеличиваем счётчик
      } else {
        sequenceArr.push(sequence); // Иначе - добавляем предыдущее значение счётчика в массив значений
        sequence = 0; // Обнуляем счётчик для подсчёта новой увеличивающейся последовательности
      }
    });

    sequenceArr.push(sequence); // Добавляем последнее значение счётчика в массив значений

    const sortSequence = sequenceArr.sort((a, b) => b - a); // Сортируем массив по убыванию
    return sortSequence[0]; // Возвращаем первый элемент - самое большое число массива
  };
  console.log(
    "Наибольшая последовательность идущих подряд чисел, которая увеличивается: ",
    ascendingSequence()
  );

  const descendingSequence = () => {
    let sequenceArr = []; // Создаём массив значений идущих подряд чисел
    let sequence = 0; // Создаём счётчик значения отдельной последовательности

    [...numbersArr].sort((a, b) => {
      if (a < b) {
        sequence++; // Если число меньше предыдущего - увеличиваем счётчик
      } else {
        sequenceArr.push(sequence); // Иначе - добавляем предыдущее значение счётчика в массив значений
        sequence = 0; // Обнуляем счётчик для подсчёта новой уменьшающейся последовательности
      }
    });

    sequenceArr.push(sequence); // Добавляем последнее значение счётчика в массив значений

    const sortSequence = sequenceArr.sort((a, b) => b - a); // Сортируем массив по убыванию
    return sortSequence[0]; // Возвращаем первый элемент - самое большое число массива
  };
  console.log(
    "Наибольшая последовательность идущих подряд чисел, которая уменьшается: ",
    descendingSequence()
  );
};

listNumbers()
  .then((result) => findValues(result)) // Оперируем данными из файла
  .catch((err) => {
    console.log(err.message); // Выводим сообщение ошибки
  });
