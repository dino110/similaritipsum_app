const fs = require("fs");
const express = require("express");
const { PassThrough } = require("stream");

const ipsumsFolderLocation = "/ipsums/";

const app = express();

app.get("/", (req, res) => {
  res.send("<h1>Ipsum app</h1>");
});

app.listen(4000, () => {
  console.log("Server is up on port 4000");
});
