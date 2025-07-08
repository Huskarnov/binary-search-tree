export { mergeSort, removeDuplicates, prettyPrint, randomArray };

function mergeSort(array) {
  if (array.length < 1) {
    return [];
  } else if (array.length === 1) {
    return [array[0]];
  }
  const middle = Math.floor(array.length / 2);
  const leftArr = array.slice(0, middle);
  const rightArr = array.slice(middle);

  let left = [...mergeSort(leftArr)];
  let right = [...mergeSort(rightArr)];
  let sortedArray = [];

  let i = 0;
  let j = 0;
  let k = 0;

  while (k < left.length + right.length) {
    if (typeof right[j] == "undefined" || left[i] <= right[j]) {
      sortedArray[k] = left[i];
      k++;
      i++;
    } else if (typeof left[i] == "undefined" || right[j] <= left[i]) {
      sortedArray[k] = right[j];
      k++;
      j++;
    }
  }

  return sortedArray;
}

function removeDuplicates(array) {
  if (array.length < 1) {
    return [];
  }
  let pointer = array[0];
  let cleanArray = [array[0]];

  for (let i = 1; i < array.length; i++) {
    if (pointer !== array[i]) {
      cleanArray.push(array[i]);
      pointer = array[i];
    }
  }

  return cleanArray;
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function randomArray() {
  let array = [];
  for (let i = 0; i < 100; i++) {
    array.push(Math.floor(Math.random() * 101));
  }
  return array;
}
