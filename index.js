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
    this.root = this.buildTree(removeDuplicates(mergeSort(array)));
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

  findNode(value) {
    return this.findNodeIntra(this.root, value);
  }

  findNodeIntra(node, value, parent = null) {
    let parento = node;

    if (value == node.data) {
      return { node, parent };
    } else if (value > node.data && node.right) {
      return this.findNodeIntra(node.right, value, parento);
    } else if (value < node.data && node.left) {
      return this.findNodeIntra(node.left, value, parento);
    } else {
      // alert("node NOT found");
      return;
    }
  }

  delete(value) {
    let items = this.findNodeIntra(this.root, value);

    if (!items) {
      alert(`${value} doesn't exist`);
      return;
      // --------------------------------------------- no child
    } else if (!items.node.right && !items.node.left) {
      if (items.parent.right.data === value) {
        items.parent.right = null;
      } else if (items.parent.left.data === value) {
        items.parent.left = null;
      }
      // --------------------------------------------- left child only
    } else if (!items.node.right && items.node.left) {
      if (items.parent.left && items.parent.left.data === value) {
        items.parent.left = items.node.left;
      } else {
        items.parent.right = items.node.left;
      }
      // --------------------------------------------- right child only
    } else if (items.node.right && !items.node.left) {
      if (items.parent.left && items.parent.left.data === value) {
        items.parent.left = items.node.right;
      } else {
        items.parent.right = items.node.right;
      }
      // --------------------------------------------- both right child left child
    }
  }
}

let chajara = new Tree(arr);

console.log(removeDuplicates(mergeSort(arr)));

chajara.insert(2);
// chajara.delete(9);
// chajara.delete(324);
prettyPrint(chajara.root);
