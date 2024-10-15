const AVLTree = require("./avl-tree");
const countingSort = require("./counting-sort");
const { performance } = require("perf_hooks");

// Function to generate random datasets
function generateRandomDataset(size, min = 0, max = 1000000) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * (max - min + 1)) + min
  );
}

// Measure AVL Tree Operations
function measureAVLTreeOperations(dataset) {
  const avlTree = new AVLTree();
  let root = null;

  const insertStart = performance.now();
  dataset.forEach((value) => {
    root = avlTree.insert(root, value);
  });
  const insertEnd = performance.now();

  const findStart = performance.now();
  dataset.forEach((value) => {
    avlTree.find(root, value);
  });
  const findEnd = performance.now();

  const deleteStart = performance.now();
  dataset.forEach((value) => {
    root = avlTree.deleteNode(root, value);
  });
  const deleteEnd = performance.now();

  return {
    insertTime: insertEnd - insertStart,
    findTime: findEnd - findStart,
    deleteTime: deleteEnd - deleteStart,
  };
}

// Measure Counting Sort Performance
function measureCountingSort(dataset) {
  const sortStart = performance.now();
  countingSort(dataset);
  const sortEnd = performance.now();

  return {
    sortTime: sortEnd - sortStart,
  };
}

// Generate 100 datasets of varying sizes and measure time complexity
function runTests() {
  for (let i = 1; i <= 100; i++) {
    const size = i * 10_000; // Datasets of increasing size
    console.log(`Testing dataset #${i}, size: ${size}`);
    const dataset = generateRandomDataset(size);

    const avlResult = measureAVLTreeOperations(dataset);
    console.log(
      `AVL Tree - Insert Time: ${avlResult.insertTime.toFixed(2)} ms`
    );
    console.log(`AVL Tree - Find Time: ${avlResult.findTime.toFixed(2)} ms`);
    console.log(
      `AVL Tree - Delete Time: ${avlResult.deleteTime.toFixed(2)} ms`
    );

    const countingSortResult = measureCountingSort([...dataset]);
    console.log(
      `Counting Sort - Sort Time: ${countingSortResult.sortTime.toFixed(2)} ms`
    );
    console.log("------------------------------------------------");
  }
}

runTests();
