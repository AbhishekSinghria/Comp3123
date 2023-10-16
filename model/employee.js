
const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
    maxlength: 100,
    lowercase: true,
  },
  lastName: {
    type: String,
    required: true,
    maxlength: 50,
    lowercase: true,
  },
  email: {
    type: String,
    unique: true,
    maxlength: 50,
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
    lowercase: true,
    maxlength: 25,
  },
  salary: {
    type: Number,
    required: true,
    default: 0.0,
    validate(value) {
      if (value < 0.0) {
        throw new Error("Negative salary is not allowed.");
      }
    },
  },
});

const EmployeeModel = mongoose.model("Employee", employeeSchema);
module.exports = EmployeeModel;
