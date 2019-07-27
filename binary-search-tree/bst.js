function Node(key, value) {
    this.key = key;
    this.value = value;

    this._left = null;
    this._right = null;
}

function BinarySearchTree() {
    this._root = new Node();
}

BinarySearchTree.prototype.insert = function(key, value) {
	let node = new Node (key, value);
	if (!this._root) 
		this._root = node;
	else 
		this._insert(this._root, node); 
	return this;
}

BinarySearchTree.prototype.root = function() { 
	return this._root.value;
}

BinarySearchTree.prototype.search = function(key) { 
	let arr = [];
	this._traverseAll(this._root, arr);
	for (let i = 0; i < arr.length - 1; i++){
		if (arr[i].key === key) 
			return arr[i].value;
	}
	return;
}

BinarySearchTree.prototype.verify = function() { 
	let arr = [];
	this._traverseKey(this._root, arr);
	for (let i = 0; i < arr.length - 1; i++){
		if (arr[i] > arr[i + 1]) return false;
	}
	return true;
}

BinarySearchTree.prototype.traverse = function(order) {
	let node = this._root; 
	let arr = [];
	this._traverseValue(this._root, arr);
	return (order) ? arr : arr.reverse();
}

BinarySearchTree.prototype.contains = function(value) { 
	let arr = this.traverse();
	return (arr.indexOf(value) == -1) ? false : true;
}

BinarySearchTree.prototype.delete = function(key) { 
	let node = this._findNode(key);
	let parentNode = this._root;
	if (node !== this._root)
		parentNode = this._findParentNode(key);
	if (node._right) {			
		let replaceNode = this._findMin(node._right);	
		let value = replaceNode.value;
		let newKey = replaceNode.key
		this.delete(replaceNode.key);	
		node.key = newKey;
		node.value = value;
		return this;
	}
	if (node._left && !node._right) {
		if (parentNode._left == node)
			parentNode._left = node._left;
		if (parentNode._right == node)
			parentNode._right = node._left;	
		return this;
	}
	else {
		if (parentNode._left == node)
			parentNode._left = null;
		if (parentNode._right == node)
			parentNode._right = null;
		return this;
	}
	
}

BinarySearchTree.prototype._findNode = function(key, root) {
	root = root || this._root;
	if (key == root.key) return root;
	if (key > root.key)
		return this._findNode(key, root._right);
	if (key < root.key) 
		return this._findNode(key, root._left);
}

BinarySearchTree.prototype._findParentNode = function(key, root) {
	root = root || this._root;
	if (key == root._left.key || key == root._right.key) return root;
	if (key > root.key)
		return this._findParentNode(key, root._right);
	if (key < root.key) 
		return this._findParentNode(key, root._left);
}

BinarySearchTree.prototype._traverseValue = function(node, arr) {
	if (!!node) {
		this._traverseValue(node._left, arr);
		arr.push(node.value);
		this._traverseValue(node._right, arr);
	}
}

BinarySearchTree.prototype._traverseKey = function(node, arr) {
	if (!!node) {
		this._traverseKey(node._left, arr);
		arr.push(node.key);
		this._traverseKey(node._right, arr);
	}
}

BinarySearchTree.prototype._traverseAll = function(node, arr) {
	if (!!node) {
		this._traverseAll(node._left, arr);
		arr.push(node);
		this._traverseAll(node._right, arr);
	}
}

BinarySearchTree.prototype._insert = function(node, newNode) {
	if (!node.key) {
		node.key = newNode.key;
		node.value = newNode.value;
		return;
	}
	if (node.key > newNode.key) {
		if (!node._left) 
			node._left = new Node ();
		this._insert(node._left, newNode);
	}	
	if (node.key <= newNode.key) {
		if (!node._right) 
			node._right = new Node ();
		this._insert(node._right, newNode);
	}
}

BinarySearchTree.prototype._findMin = function(node) {
	let minNode = node;
	while (minNode._left) {
		minNode = minNode._left;
	}
	return minNode;
}

module.exports = {
  BinarySearchTree,

  //WARNING!!!
  //PROVIDE BST STRUCTURE FOR TESTS {STRING}
  root: '_root',
  left: '_left',
  right: '_right',
  //NAME FOR REPORTS
  student: 'STUDENT NAME'
};
