
import { getCombinations,mergeAndCheck2 } from "./helperFunctions";

/**
 * this function perfoms a sum of 2 game 
 * @param {number} n this is the selected number 
 * @returns {number}
 */
export function sumOf2(n) {
    const arr = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18];
    let increment = 6;
    let currentValue = 6;
    for (let i = 0; i < arr.length; i++) {
      if (i === n) {
        return  currentValue;
      }
      if (i === 9) {
        increment =-increment;
      }
      currentValue += increment;
    }
  }







/**
 * 
 * @param {Array} array  contains the selected value of the game it cant be null
 * @param {Array} contraints  this deals with the format of the game example if the game 
 * says "select at least 2 numbers from 1st 2nd and 3rd to form 1 bet the constrain 
 * will be [2,2,2] this will formulate 2 combination on each row it is defaulted to [] 
 * @param {number} toform this is the number of bets that needs to be formed using the same example 
 * "select at least 2 numbers from 1st 2nd and 3rd to form 1 bet the TestFormu(...[2,2,2],1),
 * here 1 in the argument is the 1 bet.
 * @param {Boolean} isSpan some games require a special kind of rule and one of them is the span when you come accross a span game 
 * you have to set span to true then set a span type.
 * @param {Number} spanType this has to do with the type of span you are playing with is it a span of 3 or a span of 2 etc...
 * @returns {number}
 */

const TestFormu = (array,contraints=[],toform=1,isSpan=false,spanType=3) => {
  if(isSpan){
     const selected_num = array[0];
     const total = selected_num.map((number=>span(number,spanType))).reduce((a,b)=>a+b) // 
     return total; // total number of span bets
  }else{
    if(array.length === 1 || array.length > 2){
      const multiple_numbers  = []
      array.map((selection,index)=>{
        let combinations_of_rows = getCombinations(selection,contraints[index])
        multiple_numbers.push(combinations_of_rows.length)
      })
      return multiple_numbers.reduce((accumulator,currentValue)=>accumulator * currentValue) * toform
    }else{
      if (array.length === 2) {
        let combinations_of_row1 = getCombinations(array[0],contraints[0])
        let combinations_of_row2 = getCombinations(array[1],contraints[1])
        if(contraints[0] > contraints[1]){
          return mergeAndCheck2(combinations_of_row2,combinations_of_row1).length * toform;
        }else{
          return mergeAndCheck2(combinations_of_row1,combinations_of_row2).length * toform;
        }
      }
    }
  }
};
export default TestFormu;


/**
 * The Sum Of First Three
 * @param {*} n The number to generate the sequence 
 * @returns 
 */
export function SumOfFirstThree(n) {
  if (n < 10) {
    return ((n + 1) * (n + 2)) / 2;
  } else if (n > 17) {
    const index = [0,1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
      .slice(17, 28)
      .reverse()
      .indexOf(n - 1);
    return (index * (index + 1)) / 2;
  } else {
    let term = 63;
    if (n === 11 || n === 16) {
      term += 6;
    } else if (n === 12 || n === 15) {
      term += 10;
    } else if (n >= 13 && n <= 15) {
      term += 12;
    }
    return term;
  }
}







/**
 * The Sum Of First Three
 * @param {Number} n The number to generate the sequence 
 * @returns 
 */
export function SumOfFirstThree(n) {
  if (n < 10) {
    return ((n + 1) * (n + 2)) / 2;
  } else if (n > 17) {
    const index = [0,1, 2, 3, 4, 5, 6, 7, 8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27]
      .slice(17, 28)
      .reverse()
      .indexOf(n - 1);
    return (index * (index + 1)) / 2;
  } else {
    let term = 63;
    if (n === 11 || n === 16) {
      term += 6;
    } else if (n === 12 || n === 15) {
      term += 10;
    } else if (n >= 13 && n <= 15) {
      term += 12;
    }
    return term;
  }
}