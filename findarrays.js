export function findArrays(arr, number) {
  const result = [];
  for (let a of arr) {
    // Find the lowest and highest numbers in the current array
    const lowest = Math.min(...a);
    const highest = Math.max(...a);
    // Subtract the lowest from the highest
    const diff = highest - lowest;
    // If the difference is equal to the given number, add the array to the result list
    if (diff === number) {
      result.push(a);
    }
  }
  return result;
}

