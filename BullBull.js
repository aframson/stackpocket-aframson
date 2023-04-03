
function checkBullBull(numbers) {
    let hasSumTo10Or0 = false;
    let sumOfTwo = 0;
    let isEven = false;
    let isOdd = false;
    let isSmall = false;
    let bullN = "";
  
    for (let i = 0; i < numbers.length - 2; i++) {
      for (let j = i + 1; j < numbers.length - 1; j++) {
        for (let k = j + 1; k < numbers.length; k++) {
          if (numbers[i] + numbers[j] + numbers[k] === 10 || numbers[i] + numbers[j] + numbers[k] === 0) {
            hasSumTo10Or0 = true;
            for (let m = 0; m < numbers.length; m++) {
              if (m !== i && m !== j && m !== k) {
                sumOfTwo += numbers[m];
              }
            }
            if (sumOfTwo % 2 === 0) {
              isEven = true;
            } else {
              isOdd = true;
            }
            if (sumOfTwo % 10 === 2) {
              isSmall = true;
            }
            // Check the last digit of the sum of the two other numbers for bull n
            let lastDigit = sumOfTwo % 10;
            if (lastDigit > 0) {
              bullN = `Bull ${lastDigit}`;
            }
          }
        }
      }
    }
  
    if (hasSumTo10Or0) {
      let output = "Bull Bull ";
      if (isSmall) {
        output += "Bull Small ";
      }
      if (isEven) {
        output += "Bull Even ";
      } else {
        output += "Bull Odd ";
      }
      output += bullN;
      return output;
    } else {
      return "Does not qualify as Bull Bull";
    }
  }
  