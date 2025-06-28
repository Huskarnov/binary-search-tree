import { mergeSort, removeDuplicates, prettyPrint } from "./tools_module.js";

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let arr = [1, 2, 3, 4, 5, 6, 7];

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
    const mid = Math.floor((arr.length - 1) / 2);

    let root = arr.length == 0 ? null : new Node(arr[mid]);

    if (root) {
      root.left = this.buildTree(arr.slice(0, mid));
      root.right = this.buildTree(arr.slice(mid + 1));
    }

    return root;
  }
}

let chajara = new Tree(removeDuplicates(mergeSort(arr)));

console.log(removeDuplicates(mergeSort(arr)));
console.log(chajara.root);

prettyPrint(chajara.root);
