const express = require("express");

const route = express.Router();

route.post("/upload", (req, res) => {
  console.log("test api");
  res.json({ msg: "Good result" });
});

module.exports = route;
