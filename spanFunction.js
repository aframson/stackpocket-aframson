export function span(n,type){
    let res;
    if (type === 3) {
      if (n === 0) {
        res = 10 - n
   }else{
        res = 6 * n * (10 - n)
   }
    }else{
      if (n === 0) {
        res = 10 - n
      }else{
        res = (10 - n) * 2
       }
    }
  
    return res
}
