const express = require("express");
const Employee = require("../model/employee");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// Retrieve all employees
app.get("/api/v1/employee", async (req, res) => {
  try {
    const employeesList = await Employee.find({});
    res.status(200).send(employeesList);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Create a new employee
app.post("/api/v1/employee", async (req, res) => {
  const newEmployee = new Employee(req.body);

  try {
    await newEmployee.save();
    res.status(201).send({
      message: "Employee created successfully",
      employee: newEmployee,
    });
  } catch (error) {
    res.status(500).send(error);
  }
});

// Retrieve employee details by employee ID
app.get("/api/v1/employee/:employeeId", async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.employeeId);
    res.status(200).send({ employeeDetails: employee });
  } catch (error) {
    res.status(500).send({
      status: false,
      message: error.message,
    });
  }
});

// Update employee details by employee ID
app.put("/api/v1/employee/:employeeId", async (req, res) => {
  try {
    const updateResult = await Employee.updateOne(
      { _id: req.params.employeeId },
      req.body
    );

    if (updateResult.nModified > 0) {
      res.status(200).send({ message: "Employee updated successfully" });
    } else {
      res.status(404).send({ message: "Employee not found or no changes made" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

// Delete employee by employee ID
app.delete("/api/v1/employee/:employeeId", async (req, res) => {
  try {
    const deleteResult = await Employee.deleteOne({ _id: req.params.employeeId });
    if (deleteResult.deletedCount > 0) {
      res.status(204).send({ message: "Employee deleted successfully" });
    } else {
      res.status(404).send({ message: "Employee not found" });
    }
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = app;
