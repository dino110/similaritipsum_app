const fs = require("fs");
const express = require("express");
const { PassThrough } = require("stream");
const { analyze } = require("./utils/utils");

const ipsumsFolderLocation = "/ipsums/";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Ipsum app</h1>");
});

app.get("/all/:nwords?", (req, res) => {
  let nWords = req.params.nwords ? req.params.nwords : 100;

  var combined = PassThrough();
  const analyzed = [];
  var wordsAll = [];
  var chunkNo = 0;
  var wordsNo = 0;

  combined.on("data", (chunk) => {
    chunkNo++;
    var words = chunk.toString().match(/[a-z]+-*'*[a-z]*/gi); //array of words in chunk
    wordsAll.push(...words);

    wordsNo += words.length;

    console.log("Chunk No: " + chunkNo);
    console.log("Nomber of words in chunk: " + words.length);
    console.log("Total words: " + wordsNo);
  });

  combined.on("end", () => {
    var setNo = 1;
    do {
      analyzed.push(analyze(wordsAll.splice(0, nWords), setNo++));
    } while (wordsAll >= nWords);
    res.send(analyzed);
  });

  fileNames = fs.readdirSync("." + ipsumsFolderLocation);
  fileNames.forEach((fileName, index) => {
    if (fileName.split(".")[1] === "txt") {
      // only .txt files
      var stream = fs.createReadStream(
        __dirname + ipsumsFolderLocation + fileName,
        "utf8"
      );
      combined = stream.pipe(combined, { end: false });
      stream.once(
        "end",
        () => fileNames.length === index + 1 && combined.emit("end")
      );
    } else {
      console.log("Not a .txt file: " + fileName);
    }
  });
});

app.listen(4000, () => {
  console.log("Server is up on port 4000");
});
