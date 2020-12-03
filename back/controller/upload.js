const express = require("express");
const multer = require("multer");

const route = express.Router();
const upload = multer();

route.post("/upload", upload.single("uploadCSV"), (req, res) => {
  //   console.log(req.files.file.data);
  const csv = req.files.file.data.toString("utf8");
  console.log(csv);
  res.json({ msg: "Good result" });
});

module.exports = route;
