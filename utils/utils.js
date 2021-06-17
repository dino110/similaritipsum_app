const fs = require("fs");

const countBasics = (text, fileName) => {
  var words = text.match(/[a-z]+-*'*[a-z]*/gi);
  //console.log(words);
  var wordsNo = words.length;
  var sentences = text.match(/[a-z0-9]+[.!?]+/gi).length;
  var paragraphs = text.match(/\n\n/g).length + 1;
  var twoRsNo = 0;
  words.forEach((word) => {
    if (word.match(/\D*r+\D*r+/gi)) {
      //console.log(word);
      twoRsNo++;
    }
  });

  console.log(fileName);
  console.log("Words: " + wordsNo);
  console.log("Sentences: " + sentences);
  console.log("paragraphs: " + paragraphs);
  console.log("Words with 2 or more 'r':" + twoRsNo);
};

const countS = (stream) => {
  stream
    .pipe(fs.createWriteStream("result.txt", { flags: "a" }))
    .on("finish", () => {
      fs.appendFileSync("result.txt", "\n");
      console.log("Done");
    });
};

const analyze = (words, setNo) => {
  var result = {
    cake: 0,
    bacon: 0,
    twoRs: 0,
    cheese: 0,
    others: 0,
  };
  words.forEach((word) => {
    if (/\D*r+\D*r+/gi.test(word)) {
      result.twoRs++;
    } else if (/bacon/gi.test(word)) {
      result.bacon++;
    } else if (/cheese/gi.test(word)) {
      result.cheese++;
    } else if (/cake/gi.test(word)) {
      result.cake++;
    } else result.others++;
  });
  return {
    setNo,
    result,
  };
};

module.exports = {
  countBasics,
  countS,
  analyze,
};
