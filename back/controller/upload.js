const express = require("express");
const multer = require("multer");
const validateCsv = require("../model/logic/validateCsv");
const { writeDB } = require("../model/logic/crudDB");

const route = express.Router();
const upload = multer();

route.post("/upload", upload.single("file"), async (req, res) => {
  console.log(req.file);
  try {
    const csv = req.file.buffer.toString("utf8");
    const result = await validateCsv(csv);
    console.log(result);
    const status = await writeDB(result);
  } catch (err) {
    console.log(err);
  }
  res.json({ msg: "Good result" });
});

module.exports = route;
