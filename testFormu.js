
function TestFormu(array,contraints=[],toform=1,isSpan=false,spanType=3) {
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

    }
    
  }};
export default TestFormu;