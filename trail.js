function getCombinations(array, r) {
  const result = [];
  // Recursive function to generate combinations
  function generateCombos(combination, index) {
    if (combination.length === r) {
      result.push(combination);
      return;
    }

    if (index >= array.length) {
      return;
    }
    const newCombo = [...combination];
    newCombo.push(array[index]);

    generateCombos(newCombo, index + 1);
    generateCombos(combination, index + 1);
  }

  generateCombos([], 0);
  return result;
}

  // let drawNumbers = [5, 0, 7, 5, 3];

export default function bullBull(drawNumbers) {
  let drawNumbersCombinations = getCombinations(drawNumbers, 3);

  let qualifiedNumbers;

  for (let i = 0; i < drawNumbersCombinations.length; i++) {
    let total = drawNumbersCombinations[i].reduce((a, b) => a + b, 0);
    if (total === 10) {
      // get the array index of the number that is not 10
      qualifiedNumbers = drawNumbersCombinations[i];
      break;
    } else {
      qualifiedNumbers = drawNumbers;
    }
  }

  let results = drawNumbers.filter((item) => !qualifiedNumbers.includes(item));
  if (results.length === 0) {
    return "Does not qualify as bull bull";
  } else {
    let sumOfTwo = results.reduce((prev, curr) => prev + curr, 0);
    let lastDigit = +sumOfTwo.toString().padStart(2, "0")[1]; // get the last digit
    let smallAndBig = lastDigit < 6 ? "Bull small" : "Bull big";
    let evenAndOdd = lastDigit % 2 === 0 ? "Bull even" : "Bull odd";
    let bullN = "Bull " + lastDigit;
    let Max = drawNumbers.reduce((prev,curr)=>Math.max(prev,curr))
    let range = ['ten thousand','thousand','hundreds','tens','once']
    let maxIndex = range[drawNumbers.indexOf(Max)]
    
    let minrange = ['Ten thousand','Thousand','Hundreds','Tens','Once',]
    let Min = drawNumbers.reduce((prev,curr)=>Math.min(prev,curr))
    let minIndex = minrange[drawNumbers.indexOf(Min)]

    let dragonAndTiger = drawNumbers.slice(3, 5).reduce((prev, curr) => (prev > curr ? "Dragon": prev < curr ? "Tiger" : "And"));
    return ["Bull Bull", smallAndBig, evenAndOdd, bullN, dragonAndTiger,maxIndex,minIndex];
  }
}