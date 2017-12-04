var SuffixTree = require("./SuffixTree");
var st = new SuffixTree();

printSearchResult = function(pat) {
  var result = st.search(pat);
  if (result)
    result.forEach(i => console.log(`Запрос "${pat}" найден в позиции ${i.index} в посту №${i.post}`));
  else
    console.log(`Запрос "${pat}" не найден`);
};
printMaxCountResult = function() {
  var res = st.findMaxCount();
  console.log(`Самое частотное слово - "${res.word}", количество повторений - ${res.count}`);
};
printMaxWordResult = function() {
  var res = st.findMaxWord();
  console.log(`Самое длинное слово - "${res.word}", длинна - ${res.length}`);
};

console.log();
st.fromFile("../resources/dump.txt", 800);
printSearchResult("привет");
printSearchResult("привет мир");
printMaxCountResult();
printMaxWordResult();
console.log();

st.clear();

console.log();
st.addPost("aaaa aaab  aaac  aaar1ewqfqeq  aaay aaau aaai aaao bbbb bbbb");
st.addPost("aaab aaac aaac aaar aaac");
st.addPost("rrrra rrrrb rrrrbcd rrrrbc aaab");
printSearchResult("aaab");
printSearchResult("aaab2");
printMaxCountResult();
printMaxWordResult();
console.log();