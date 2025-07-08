import {
  mergeSort,
  removeDuplicates,
  prettyPrint,
  randomArray,
} from "./tools_module.js";

// let arr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
let arr = randomArray();
// let arr = [
//   2, 4, 5, 6, 7, 9, 10, 11, 13, 17, 18, 19, 22, 24, 25, 27, 29, 30, 32, 33, 34,
//   36, 37, 40, 42, 44, 47, 50, 51, 53, 54, 58, 60, 62, 63, 64, 66, 67, 68, 70,
//   71, 73, 75, 76, 77, 79, 81, 82, 83, 84, 85, 86, 89, 92, 93, 94, 95, 96, 97,
//   98, 99,
// ];
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
    this.root = this.#buildTree(removeDuplicates(mergeSort(array)));
    this.arraySlate = [];
  }

  #buildTree(arr) {
    const mid = Math.floor((arr.length - 1) / 2);

    let root = arr.length == 0 ? null : new Node(arr[mid]);

    if (root) {
      root.left = this.#buildTree(arr.slice(0, mid));
      root.right = this.#buildTree(arr.slice(mid + 1));
    }

    return root;
  }

  insert(value) {
    let current = this.root;

    if (!current || current.data === null) {
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

  #findNodeIntra(node, value, parent = null) {
    let parento = node;

    if (value == node.data) {
      // alert("value FOUND !!");

      return { node, parent };
    } else if (value > node.data && node.right) {
      return this.#findNodeIntra(node.right, value, parento);
    } else if (value < node.data && node.left) {
      return this.#findNodeIntra(node.left, value, parento);
    } else {
      alert("value NOT found");
      return;
    }
  }

  findNode(value) {
    return this.#findNodeIntra(this.root, value);
  }

  delete(value) {
    let items = this.#findNodeIntra(this.root, value);

    if (!items) {
      alert(`${value} doesn't exist`);
      return;
      // --------------------------------------------- no child (leaf)
    } else if (!items.node.right && !items.node.left) {
      if (!items.parent) {
        items.node.data = null;

        return;
      }
      if (items.parent.data < value) {
        items.parent.right = null;
      } else if (items.parent.data > value) {
        items.parent.left = null;
      }
      // --------------------------------------------- left child only
    } else if (!items.node.right && items.node.left) {
      // if (items.parent.left && items.parent.left.data === value) {
      if (!items.parent) {
        this.root = items.node.left;
        return;
      }
      if (items.parent.data > value) {
        items.parent.left = items.node.left;
      } else {
        items.parent.right = items.node.left;
      }
      // --------------------------------------------- right child only
    } else if (items.node.right && !items.node.left) {
      // if (items.parent.left && items.parent.left.data === value) {
      if (!items.parent) {
        this.root = items.node.right;
        return;
      }
      if (items.parent.data < value) {
        items.parent.right = items.node.right;
      } else {
        items.parent.left = items.node.right;
      }
    }
    // ---------------------------------------------
    // ---------------------------------------------
    // --------------------------------------------- both right child left child
    else if (items.node.right && items.node.left) {
      // --------------------------------------------- right child has no child
      if (!items.node.right.left && !items.node.right.right) {
        items.node.data = items.node.right.data;
        items.node.right = null;
        // --------------------------------------------- right child has only right child
      } else if (!items.node.right.left && items.node.right.right) {
        items.node.data = items.node.right.data;
        items.node.right = items.node.right.right;
        // --------------------------------------------- right child has left child or both
      } else if (items.node.right.left) {
        const valueToUse3 = items.node.right.left.data;
        this.delete(valueToUse3);
        items.node.data = valueToUse3;
      }
    }
  }

  levelOrder(callback, rootNode = this.root) {
    if (!callback) {
      alert("No Callback provided");
      return;
    }

    let queue = [];
    let pointer = 0;

    queue.push(rootNode);

    while (queue[pointer]) {
      callback(queue[pointer]);

      if (queue[pointer].left) {
        queue.push(queue[pointer].left);
      }
      if (queue[pointer].right) {
        queue.push(queue[pointer].right);
      }
      pointer++;
    }
  }

  levelOrderLastValue(rootNode = this.root) {
    let lastValue;

    let queue = [];
    let pointer = 0;

    queue.push(rootNode);

    while (queue[pointer]) {
      lastValue = queue[pointer];

      if (queue[pointer].left) {
        queue.push(queue[pointer].left);
      }
      if (queue[pointer].right) {
        queue.push(queue[pointer].right);
      }
      pointer++;
    }
    return lastValue;
  }
  levelOrderRecursive(callback, queue = [], node) {
    if (typeof callback !== "function") {
      alert("Callback not provided !!");
      return;
    }
    if (node && queue.length === 0) queue.push(node);

    callback(queue[0]);

    const current = queue[0];

    if (current.left) queue.push(current.left);

    if (current.right) queue.push(current.right);

    queue.shift();

    if (queue.length > 0) this.levelOrderRecursive(callback, queue);
  }

  inOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      alert("No callback provided !!");
      return;
    }
    if (!root) {
      return;
    } else {
      this.inOrder(callback, root.left);
      callback(root);
      this.inOrder(callback, root.right);
    }
  }

  preOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      alert("No callback provided !!");
      return;
    }
    if (!root) {
      return;
    } else {
      callback(root);
      this.preOrder(callback, root.left);
      this.preOrder(callback, root.right);
    }
  }
  postOrder(callback, root = this.root) {
    if (typeof callback !== "function") {
      alert("No callback provided !!");
      return;
    }
    if (!root) {
      return;
    } else {
      this.postOrder(callback, root.left);
      this.postOrder(callback, root.right);
      callback(root);
    }
  }

  depth(value) {
    return this.#depthIntra(this.root, value);
  }

  #depthIntra(node, value, height = 0) {
    if (value === node.data) {
      return height;
    } else if (value > node.data && node.right) {
      height++;
      return this.#depthIntra(node.right, value, height);
    } else if (value < node.data && node.left) {
      height++;
      return this.#depthIntra(node.left, value, height);
    } else {
      alert("value NOT found");
      return null;
    }
  }

  height(value) {
    let furthestNode;

    if (!this.findNode(value)) {
      return;
    } else {
      furthestNode = this.findNode(value).node;
    }
    return (
      this.depth(this.levelOrderLastValue(furthestNode).data) -
      this.depth(value)
    );
  }

  isBalanced() {
    // this.levelOrder(this.callbackFillWorkArray);
    let heightTemp;
    this.levelOrder((item) => {
      this.arraySlate.push(item);
    });

    for (let i = 0; i < this.arraySlate.length; i++) {
      if (this.arraySlate[i].right) {
        heightTemp = this.height(this.arraySlate[i].right.data);
      }
      if (this.arraySlate[i].left) {
        heightTemp = Math.abs(
          heightTemp - this.height(this.arraySlate[i].left.data)
        );
      }
      if (heightTemp > 1) {
        alert("Tree NOT balanced !!");
        this.arraySlate = [];
        return false;
      }
    }
    alert("Tree balanced");
    this.arraySlate = [];
    return true;
  }

  rebalance() {
    if (!this.isBalanced()) {
      this.levelOrder((item) => {
        this.arraySlate.push(item.data);
      });
      this.root = this.#buildTree(removeDuplicates(mergeSort(this.arraySlate)));
      this.arraySlate = [];
    }
  }

  callback(item) {
    console.log(item.data);
  }
  callbackFillWorkArray = (item) => {
    this.arraySlate.push(item);
  };
}

let chajara = new Tree(arr);

// console.log(removeDuplicates(mergeSort(arr)));

prettyPrint(chajara.root);
chajara.isBalanced();
prettyPrint(chajara.root);
