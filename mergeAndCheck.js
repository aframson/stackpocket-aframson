export function mergeAndCheck2(arr1, arr2) {
  let mergedArr = [];
  for (let i = 0; i < arr1.length; i++) {
    for (let j = 0; j < arr2.length; j++) {
      if (arr2[j].indexOf(arr1[i][0]) !== -1 && arr1[i].every(val => arr2[j].indexOf(val) !== -1)) {
        continue; // skip if arr1 and arr2 have same values
      } else {
        mergedArr.push([...arr1[i], ...arr2[j]]);
      }
    }
  }
  return mergedArr;
}
