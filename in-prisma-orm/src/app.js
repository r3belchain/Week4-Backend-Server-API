const express = require("express");
const app = express();

const errorHandler = require("@middleware/errorHandler");

app.use(errorHandler);
app.use(express.json());

app.get("/", (req, res) => {
  res.send("hello world");
});

module.exports = app;
