const express = require("express");
const multer = require("multer");
const validateCsv = require("../model/logic/validateCsv");
const { writeDB } = require("../model/logic/crudDB");

const route = express.Router();
const upload = multer();

route.post("/upload", upload.single("file"), async (req, res) => {
  try {
    const csv = req.file.buffer.toString("utf8");
    console.log(req.file);
    const result = await validateCsv(csv);
    console.log(result);
    const status = await writeDB(result);
    res.status(200).json({ message: "CSV File has been Upload Successfully." });
  } catch (err) {
    console.log(err);
    res.status(400).json({ message: err });
  }
});

module.exports = route;
