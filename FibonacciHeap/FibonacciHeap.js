"use strict";
/*----------------------------  private  ----------------------------*/
/*class*/ var Node  = function(key, value) {
  this.key = key;
  this.value = value;
  this.parent = null;
  this.child = null;
  this.left = this;
  this.right = this;
  this.degree = 0;
  this.mark = false;
}; var mergeLists   = function(a, b, compare) {
  if (a && b) {
    var temp = a.right;
    a.right = b.right;
    a.right.left = a;
    b.right = temp;
    b.right.left = b;
    return compare(a.key, b.key) < 0 ? a : b;
  } else return a || b || null;
}; var removeNode   = function(node) {
  var left = node.left;
  var right = node.right;
  left.right = right;
  right.left = left;
  node.right = node;
  node.left = node;
}; var consolidate  = function(min, compare) {
  var a = [], listNodes = [];
  var cur = min; do {
    listNodes.push(cur);
    cur = cur.right;
  } while (cur !== min);
  for (let i = 0; i < listNodes.length; ++i) {
    var current = listNodes[i];
    while (a[current.degree]) {
      var conflict = a[current.degree];
      if (compare(current.key, conflict.key) > 0) {
        var temp = current;
        current = conflict;
        conflict = temp;
      }
      removeNode(conflict);
      current.child = mergeLists(conflict, current.child, compare);
      conflict.parent = current;
      conflict.mark = false;
      a[current.degree] = null;
      current.degree++;
    }
    a[current.degree] = current;
  }
  min = null;
  for (let i = 0; i < a.length; ++i) {
    if (a[i]) {
      a[i].right = a[i]; a[i].left = a[i];
      min = mergeLists(min, a[i], compare);
    }
  }
  return min;
}; var cut          = function(min, node, parent, compare) {
  parent.child = node.right !== node ? node.right : null;
  removeNode(node);
  parent.degree--;
  min = mergeLists(min, node, compare);
  node.parent = null;
  node.mark = false;
  return min;
}; var cascadingCut = function(min, node, compare) {
  var parent = node.parent;
  if (parent) {
    if (node.mark) {
      min = cut(min, node, parent, compare);
      min = cascadingCut(min, parent, compare);
    } else {
      node.mark = true;
    }
  }
  return min;
};/*--------------------------  public   ----------------------------*/
/*class*/ var FibonacciHeap            = function(compare) {
  this._size = 0;
  this._min = null;
  this._compare = compare || ((a, b) => a - b);
}; FibonacciHeap.prototype.insert      = function(key, value) {
  var newNode = new Node(key, value);
  this._min = mergeLists(this._min, newNode, this._compare);
  this._size++;
  return newNode;
}; FibonacciHeap.prototype.peekMin     = function() {
  //
  return this._min;
}; FibonacciHeap.prototype.union       = function(heap) {
  this._min = mergeLists(this._min, heap._min, this._compare);
  this._size += heap._size;
}; FibonacciHeap.prototype.extractMin  = function() {
  var z = this._min;
  if (z) {
    if (z.child) {
      var child = z.child;
      do {
        child.parent = null;
        child = child.right;
      } while (child !== z.child);
    }
    var rightRoot = z.right !== z ? z.right : null;
    removeNode(z);
    this._size--;
    this._min = mergeLists(rightRoot, z.child, this._compare);
    if (this._min) {
      this._min = consolidate(this._min, this._compare);
    }
  }
  return z;
}; FibonacciHeap.prototype.decreaseKey = function(node, newKey) {
  var _del = typeof newKey === "undefined";
  if (this._compare(newKey, node.key) > 0 && !_del) {
    console.log("Некорректное значение нового ключа");
    return null;
  }
  node.key = newKey;
  var parent = node.parent;
  if (parent && (this._compare(parent.key, node.key) > 0 || _del)) {
    cut(this._min, node, parent, this._compare);
    cascadingCut(this._min, parent, this._compare);
  }
  if (this._compare(this._min.key, node.key) > 0 || _del) {
    this._min = node;
  }
}; FibonacciHeap.prototype.delete      = function(node) {
  this.decreaseKey(node);
  this.extractMin();
}; FibonacciHeap.prototype.isEmpty     = function() {
  //-----------------------;
  return this._min === null;
}; FibonacciHeap.prototype.size        = function() {
  //---------------;
  return this._size;
}; FibonacciHeap.prototype.clear       = function() {
  this._min = null;
  this._size = 0;
}; /*--------------------------  exports  ----------------------------*/
module.exports = FibonacciHeap;