const express = require("express");
const userRouter = require("./route/userRoutes");
const employeeRouter = require("./route/employeeRoutes");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
const SERVER_PORT = 27017;

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(employeeRouter);
app.use(userRouter);

const DB_CONNECTION_STRING =
  "mongodb+srv://abhisinghria:7Y8uuNhD1fGaPtfT@cluster0.s3isqfz.mongodb.net/?retryWrites=true&w=majority";

mongoose
  .connect(DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((err) => {
    console.log("Error: " + err);
    process.exit();
  });

app.route("/").get((req, res) => {
  res.send("<h1>MongoDB + Mongoose Example</h1>");
});

app.listen(SERVER_PORT, () => {
  console.log(`Server running at http://localhost:${SERVER_PORT}/`);
});
