const fs = require("fs/promises");
const path = require("path");

const numbersPath = path.join("10m.txt");

async function listNumbers() {
  return await fs.readFile(numbersPath, "utf-8");
}

const findValues = (data) => {
  const numbersArr = data.split("\n").map((elem) => Number(elem));
  const sortNumbers = [...numbersArr].sort((a, b) => a - b);

  console.log(
    "Максимальное число в файле: ",
    sortNumbers[sortNumbers.length - 1]
  );

  console.log("Минимальное число в файле: ", sortNumbers[0]);

  const median =
    sortNumbers.length % 2 === 0
      ? (sortNumbers[sortNumbers.length / 2 - 1] +
          sortNumbers[sortNumbers.length / 2]) /
        2
      : sortNumbers[(sortNumbers.length - 1) / 2];
  console.log("Медиана: ", median);

  const arithmeticMean =
    numbersArr.reduce((acc, elem) => acc + elem, 0) / sortNumbers.length;
  console.log("Среднее арифметическое значение: ", arithmeticMean);

  const ascendingSequence = () => {
    let sequenceArr = [];
    let sequence = 0;

    [...numbersArr].sort((a, b) => {
      if (a > b) {
        sequence++;
      } else {
        sequenceArr.push(sequence);
        sequence = 0;
      }
    });

    sequenceArr.push(sequence);

    const sortSequence = sequenceArr.sort((a, b) => b - a);
    return sortSequence[0];
  };
  console.log(
    "Наибольшая последовательность идущих подряд чисел, которая увеличивается: ",
    ascendingSequence()
  );

  const descendingSequence = () => {
    let sequenceArr = [];
    let sequence = 0;

    [...numbersArr].sort((a, b) => {
      if (a < b) {
        sequence++;
      } else {
        sequenceArr.push(sequence);
        sequence = 0;
      }
    });

    sequenceArr.push(sequence);

    const sortSequence = sequenceArr.sort((a, b) => b - a);
    return sortSequence[0];
  };
  console.log(
    "Наибольшая последовательность идущих подряд чисел, которая уменьшается: ",
    descendingSequence()
  );
};

listNumbers()
  .then((result) => findValues(result))
  .catch((err) => {
    console.log(err.message);
  });
