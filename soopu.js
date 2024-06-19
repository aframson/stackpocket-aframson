  if (array.length === 2) {
        let combinations_of_row1 = getCombinations(array[0],contraints[0])
        let combinations_of_row2 = getCombinations(array[1],contraints[1])
        if(contraints[0] > contraints[1]){
          return mergeAndCheck2(combinations_of_row2,combinations_of_row1).length * toform;
        }else{
          return mergeAndCheck2(combinations_of_row1,combinations_of_row2).length * toform;
        }
      }