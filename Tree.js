const Node = require("./Node");

class Tree {
  constructor(arr) {
    const sortedArray = [...new Set(arr)].sort((a, b) => a - b);
    this.root = this.buildTree(sortedArray);
  }

  buildTree(arr) {
    if (arr.length === 0) return null;

    const midpoint = Math.floor(arr.length / 2);
    const newNode = new Node(arr[midpoint]);

    newNode.leftChild = this.buildTree(arr.slice(0, midpoint));
    newNode.rightChild = this.buildTree(arr.slice(midpoint + 1));

    return newNode;
  }

  insert(value, currentNode = this.root) {
    if (currentNode === null) return new Node(value);
    if (currentNode.value === value) return;

    currentNode.value < value
      ? (currentNode.rightChild = this.insert(value, currentNode.rightChild))
      : (currentNode.leftChild = this.insert(value, currentNode.leftChild));

    return currentNode;
  }

  delete(value, root = this.root) {
    if (root === null) return root;
    if (root.key < value) root.right = this.delete(value, root.right);
    else if (root.key > value) root.left = this.delete(value, root.left);
    else {
      if (root.left === null) return root.right;
      else if (root.right === null) return root.left;
      root.key = this.#minValue(root.right);
      root.right = this.delete(value, root.right);
    }
    return root;
  }
}
