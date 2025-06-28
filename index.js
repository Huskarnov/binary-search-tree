class Node {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(array) {
    this.root = this.buildTree(array);
  }

  buildTree(arr) {
    let array = arr;
    //  sort + remove duplicates
    let root;
    return root;
  }

  mergeSort(array) {
    if (array.length < 1) {
      return;
    } else if (array.length == 1) {
      return array[0];
    }
    let baseArr = array;
    let middleIndex = Math.floor(array.length / 2);
    let left = baseArr.splice(0, middleIndex);
    let right = baseArr;

    console.log(baseArr);
    console.log(left);
    console.log(right);
  }
}

let arr = [22, 1, 4, 9, 2, 8, 1, 5, 8, 6, 7, 3, 22];

function mergeSort(array) {
  if (array.length < 1) {
    return;
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
console.log(mergeSort(arr));
console.log(removeDuplicates(mergeSort(arr)));
