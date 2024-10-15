function countingSort(arr) {
  if (arr.length === 0) return arr;

  // Manually find the maximum and minimum values in the array
  let max = arr[0];
  let min = arr[0];
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] > max) max = arr[i];
    if (arr[i] < min) min = arr[i];
  }

  const range = max - min + 1;
  const count = new Array(range).fill(0);
  const output = new Array(arr.length).fill(0);

  // Count occurrences of each value
  for (let i = 0; i < arr.length; i++) {
    count[arr[i] - min]++;
  }

  // Calculate cumulative count
  for (let i = 1; i < count.length; i++) {
    count[i] += count[i - 1];
  }

  // Place the elements in sorted order
  for (let i = arr.length - 1; i >= 0; i--) {
    output[count[arr[i] - min] - 1] = arr[i];
    count[arr[i] - min]--;
  }

  return output;
}

module.exports = countingSort;
