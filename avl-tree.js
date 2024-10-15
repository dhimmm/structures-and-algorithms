class Node {
  constructor(key) {
    this.key = key;
    this.left = null;
    this.right = null;
    this.height = 1;
  }
}

class AVLTree {
  getHeight(node) {
    if (!node) return 0;
    return node.height;
  }

  getBalance(node) {
    if (!node) return 0;
    return this.getHeight(node.left) - this.getHeight(node.right);
  }

  rightRotate(y) {
    const x = y.left;
    const T2 = x.right;

    x.right = y;
    y.left = T2;

    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;
    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;

    return x;
  }

  leftRotate(x) {
    const y = x.right;
    const T2 = y.left;

    y.left = x;
    x.right = T2;

    x.height = Math.max(this.getHeight(x.left), this.getHeight(x.right)) + 1;
    y.height = Math.max(this.getHeight(y.left), this.getHeight(y.right)) + 1;

    return y;
  }

  insert(node, key) {
    if (!node) return new Node(key);

    if (key < node.key) {
      node.left = this.insert(node.left, key);
    } else if (key > node.key) {
      node.right = this.insert(node.right, key);
    } else {
      return node; // No duplicates
    }

    node.height =
      1 + Math.max(this.getHeight(node.left), this.getHeight(node.right));
    const balance = this.getBalance(node);

    if (balance > 1 && key < node.left.key) {
      return this.rightRotate(node);
    }
    if (balance < -1 && key > node.right.key) {
      return this.leftRotate(node);
    }
    if (balance > 1 && key > node.left.key) {
      node.left = this.leftRotate(node.left);
      return this.rightRotate(node);
    }
    if (balance < -1 && key < node.right.key) {
      node.right = this.rightRotate(node.right);
      return this.leftRotate(node);
    }

    return node;
  }

  find(node, key) {
    if (!node || node.key === key) return node;

    if (key < node.key) return this.find(node.left, key);
    return this.find(node.right, key);
  }

  getMinValueNode(node) {
    let current = node;
    while (current.left !== null) current = current.left;
    return current;
  }

  deleteNode(root, key) {
    if (!root) return root;

    if (key < root.key) root.left = this.deleteNode(root.left, key);
    else if (key > root.key) root.right = this.deleteNode(root.right, key);
    else {
      if (!root.left || !root.right) {
        let temp = root.left ? root.left : root.right;
        root = temp ? temp : null;
      } else {
        let temp = this.getMinValueNode(root.right);
        root.key = temp.key;
        root.right = this.deleteNode(root.right, temp.key);
      }
    }

    if (!root) return root;

    root.height =
      1 + Math.max(this.getHeight(root.left), this.getHeight(root.right));
    const balance = this.getBalance(root);

    if (balance > 1 && this.getBalance(root.left) >= 0)
      return this.rightRotate(root);
    if (balance > 1 && this.getBalance(root.left) < 0) {
      root.left = this.leftRotate(root.left);
      return this.rightRotate(root);
    }
    if (balance < -1 && this.getBalance(root.right) <= 0)
      return this.leftRotate(root);
    if (balance < -1 && this.getBalance(root.right) > 0) {
      root.right = this.rightRotate(root.right);
      return this.leftRotate(root);
    }

    return root;
  }
}

module.exports = AVLTree;
