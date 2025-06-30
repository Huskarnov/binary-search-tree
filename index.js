import { mergeSort, removeDuplicates, prettyPrint } from "./tools_module.js";

let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
// let arr = [50, 20, 30, 40, 32, 34, 36, 70, 60, 65, 80, 75, 85];
// let arr = [];
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

  insert(value) {
    let current = this.root;

    if (!current) {
      return (this.root = new Node(value));
    }

    if (value == current.data) {
      alert("value already existing");
      return;
    }

    while (current) {
      if (value == current.data) {
        alert("value already existing");
        return;
      }
      if (value < current.data) {
        if (current.left) {
          current = current.left;
        } else {
          current.left = new Node(value);
          return;
        }
      } else {
        if (current.right) {
          current = current.right;
        } else {
          current.right = new Node(value);
          return;
        }
      }
    }
  }

  findNode(node, value) {
    if (value == node.data) {
      alert("node found!");
      return node.data;
    } else if (value > node.data && node.right) {
      this.findNode(node.right, value);
    } else if (value < node.data && node.left) {
      this.findNode(node.left, value);
    } else {
      alert("node NOT found");
      return;
    }
  }
}

let chajara = new Tree(removeDuplicates(mergeSort(arr)));

console.log(removeDuplicates(mergeSort(arr)));

chajara.insert(22);

console.log(chajara.root);
prettyPrint(chajara.root);

console.log(chajara.findNode(chajara.root, 4));
