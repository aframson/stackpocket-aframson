

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






