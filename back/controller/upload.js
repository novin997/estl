const express = require("express");
const multer = require("multer");
const validateCsv = require("../model/logic/validateCsv");

const route = express.Router();
const upload = multer();

route.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  const csv = req.file.buffer.toString("utf8");
  const result = await validateCsv(csv);

  res.json({ msg: "Good result" });
});

module.exports = route;
