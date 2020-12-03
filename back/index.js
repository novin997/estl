const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const uploadRoute = require("./controller/upload");

const app = express();

app.use(express.static("public"));
app.use(cors());
app.use(fileUpload());

app.use("/users", uploadRoute);

app.listen("8080", () => {
  console.log("Server listening to Port 8080");
});
