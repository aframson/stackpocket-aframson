const arr = [1, 2, 3, 4, 5];

const middleIndex = Math.floor(arr.length / 2);
const middleNumber = arr[middleIndex];

if (middleNumber % 2 === 0) {
  console.log(`${middleNumber} is an even number.`);
} else {
  console.log(`${middleNumber} is an odd number.`);
}