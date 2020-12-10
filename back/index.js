const express = require("express");
const cors = require("cors");
const uploadRoute = require("./controller/upload");
const getData = require("./controller/getData");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
app.use(cors());
app.use("/users", uploadRoute);
app.use("/users", getData);

app.listen("8080", () => {
  console.log("Server listening to Port 8080");
});

mongoose.connect(
  process.env.DB_URL,
  { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true },
  () => {
    console.log("Connected to MongoDB");
  }
);

module.exports = app;
