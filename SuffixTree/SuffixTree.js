"use strict";
const fs = require("fs");
/*----------------------------  private  ----------------------------*/
/*class*/ var Node       = function() {
	this.children = [];
	this.indexes = [];
}; Node.prototype.insert = function(s, i, n) {
	var obj = { index: i, post: n }
	this.indexes.push(obj);
	if (s.length > 0) {
		var cIndex = s[0];
		if (!this.children[cIndex])
			this.children[cIndex] = new Node();
		this.children[cIndex].insert(s.substring(1), i + 1, n);
	}
}; Node.prototype.search = function(s) {
	if (s.length == 0)
		return this.indexes;
	if (this.children[s[0]])
		return (this.children[s[0]]).search(s.substring(1));
	else
		return null;
}; var findForMaxCount   = function(node) {
	var res = {word: "", count: 0};
	var subword;
	for (let i in node.children) {
		if (i == " ") {
			res.count = node.children[i].indexes.length;
			subword = "";
		} else {
			var tmp = findForMaxCount(node.children[i]);
			if (tmp.count > res.count) {
				subword = i + tmp.word;
				res.count = tmp.count;
			}
		}
	}
	res.word += subword;
	return res;
}; var findForMaxWord    = function(node) {
	var res = {word: "", length: 0};
	var subword, sublen = 0;
	for (let i in node.children) {
		if (i == " ") {
			if (sublen == 0) {
				subword = "";
				sublen = 1;
			}
		} else {
			var tmp = findForMaxWord(node.children[i]);
			if (tmp.length > sublen) {
				subword = i + tmp.word;
				sublen = ++tmp.length;
			}
		}
	}
	res.length += sublen;
	res.word += subword;
	return res;
};/*--------------------------  public   ----------------------------*/
/*class*/ var SuffixTree             = function() {
	this.nums = 0;
	this.root = new Node();
}; SuffixTree.prototype.addPost      = function(post) {
	this.nums++;
	post = " " + post.replace(/\s+/g,' ').trim().toLowerCase() + " ";
	for (let i = 0; i < post.length; i++)
		this.root.insert(post.substring(i), i, this.nums);
}; SuffixTree.prototype.fromFile     = function(fileName, limit) {
	var posts = fs.readFileSync(fileName, "utf8").split("\n");
	if (limit) posts = posts.slice(0, limit);
	posts.forEach(this.addPost, this);
}; SuffixTree.prototype.search       = function(pat) {
	pat = pat.toLowerCase();
	var result = this.root.search(pat);
	if (result) {
		var patLen = pat.length;
		result = result.map(i => {
			return {
				index: i.index - patLen,
				post: i.post
			};
		});
	}
	return result;
}; SuffixTree.prototype.findMaxCount = function() {
	var cur = this.root.children[" "];
	return findForMaxCount(cur);
}; SuffixTree.prototype.findMaxWord  = function() {
	var cur = this.root.children[" "];
	var res = findForMaxWord(cur);
	res.length--;
	return res;
}; SuffixTree.prototype.clear        = function() {
	this.nums = 0;
	this.root = new Node();
};/*--------------------------  exports  ----------------------------*/
module.exports = SuffixTree;