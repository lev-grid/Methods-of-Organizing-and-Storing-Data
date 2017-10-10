var wait = require('wait');
var FibonacciHeap = require('./FibonacciHeap');

var fh1 = new FibonacciHeap();
var fh2 = new FibonacciHeap();

fh1.insert(6, 3);
fh1.insert(5, 7);
fh1.insert(7, 5);
var d1 = fh1.insert(4, 2);
fh1.insert(9, 6);
fh1.insert(3, 4);
fh1.insert(8, 1);
fh1.insert(2, 8);

fh2.insert(8, 3);
fh2.insert(4, 7);
fh2.insert(3, 5);
var dk1 = fh2.insert(5, 2);
fh2.insert(6, 6);
fh2.insert(7, 4);
fh2.insert(1, 8);
fh2.insert(2, 1);

fh1.union(fh2);

var size = fh1.size();
var minNode = fh1.peekMin();
console.log("minNode: {key: %s, value: %s};\tsize: %s.", minNode.key, minNode.value, size);
fh1.delete(d1);
fh1.decreaseKey(dk1, 0);
var size = fh1.size();
var minNode = fh1.peekMin();
console.log("minNode: {key: %s, value: %s};\tsize: %s.\n", minNode.key, minNode.value, size);

while (size > 6) {
	size = fh1.size();
	minNode = fh1.extractMin();
	console.log("minNode: {key: %s, value: %s};\tsize: %s.", minNode.key, minNode.value, size);
}

console.log("\nisEmpty: %s; size: %s.", fh1.isEmpty(), fh1.size());
fh1.clear();
console.log("isEmpty: %s; size: %s.", fh1.isEmpty(), fh1.size());

wait("Press any key to exit");