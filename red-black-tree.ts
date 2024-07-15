enum Color {
    RED,
    BLACK
}

class TreeNode<T> {
    value: T;
    color: Color;
    left: TreeNode<T> | null;
    right: TreeNode<T> | null;
    parent: TreeNode<T> | null;

    constructor(value: T, color: Color = Color.RED) {
        this.value = value;
        this.color = color;
        this.left = null;
        this.right = null;
        this.parent = null;
    }
}

class RedBlackTree<T> {
    private root: TreeNode<T> | null = null;

    insert(value: T): void {
        const newNode = new TreeNode(value);
        if (this.root === null) {
            newNode.color = Color.BLACK;
            this.root = newNode;
        } else {
            let parent = this.root;
            let current: TreeNode<T> | null = this.root;

            while (current !== null) {
                parent = current;
                if (value < current.value) {
                    current = current.left;
                } else {
                    current = current.right;
                }
            }

            newNode.parent = parent;
            if (value < parent.value) {
                parent.left = newNode;
            } else {
                parent.right = newNode;
            }

            this.fixInsert(newNode);
        }
    }

    private fixInsert(node: TreeNode<T>): void {
        while (node !== this.root && node.parent!.color === Color.RED) {
            let grandparent = node.parent!.parent!;
            if (node.parent === grandparent.left) {
                let uncle = grandparent.right;
                if (uncle && uncle.color === Color.RED) {
                    node.parent!.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                } else {
                    if (node === node.parent!.right) {
                        node = node.parent!;
                        this.rotateLeft(node);
                    }
                    node.parent!.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rotateRight(grandparent);
                }
            } else {
                let uncle = grandparent.left;
                if (uncle && uncle.color === Color.RED) {
                    node.parent!.color = Color.BLACK;
                    uncle.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    node = grandparent;
                } else {
                    if (node === node.parent!.left) {
                        node = node.parent!;
                        this.rotateRight(node);
                    }
                    node.parent!.color = Color.BLACK;
                    grandparent.color = Color.RED;
                    this.rotateLeft(grandparent);
                }
            }
        }
        this.root!.color = Color.BLACK;
    }

    private rotateLeft(node: TreeNode<T>): void {
        let temp = node.right!;
        node.right = temp.left;
        if (temp.left !== null) {
            temp.left.parent = node;
        }
        temp.parent = node.parent;
        if (node.parent === null) {
            this.root = temp;
        } else if (node === node.parent.left) {
            node.parent.left = temp;
        } else {
            node.parent.right = temp;
        }
        temp.left = node;
        node.parent = temp;
    }

    private rotateRight(node: TreeNode<T>): void {
        let temp = node.left!;
        node.left = temp.right;
        if (temp.right !== null) {
            temp.right.parent = node;
        }
        temp.parent = node.parent;
        if (node.parent === null) {
            this.root = temp;
        } else if (node === node.parent.right) {
            node.parent.right = temp;
        } else {
            node.parent.left = temp;
        }
        temp.right = node;
        node.parent = temp;
    }

    printTree(): void {
        this.printHelper(this.root, "", true);
    }

    private printHelper(node: TreeNode<T> | null, indent: string, last: boolean): void {
        if (node !== null) {
            console.log(indent + (last ? "R---- " : "L---- ") + node.value + " (" + (node.color === Color.RED ? "RED" : "BLACK") + ")");
            this.printHelper(node.left, indent + (last ? "     " : "|    "), false);
            this.printHelper(node.right, indent + (last ? "     " : "|    "), true);
        }
    }
}

// Usage example:
const rbt = new RedBlackTree<number>();
rbt.insert(10);
rbt.insert(20);
rbt.insert(30);
rbt.insert(15);
rbt.insert(25);

rbt.printTree();
