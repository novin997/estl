const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    login: {
      type: String,
      required: true,
      unique: true,
      dropDups: true,
    },
    name: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
      required: true,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Employee", employeeSchema);
