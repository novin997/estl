const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  login: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  salary: {
    type: Decimal128,
    required: true,
  },
});

module.exports(mongoose.model("Employee", employeeSchema));
