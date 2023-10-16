const express = require("express");
const User = require("../model/user");
const bodyParser = require("body-parser");
const app = express();

app.use(bodyParser.json());

// User Registration
app.post("/api/v1/users/register", async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// User Authentication
app.post("/api/v1/users/authenticate", async (req, res) => {
  try {
    const user = await User.findOne({ username: req.body.username });

    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }

    try {
      const isPasswordValid = await user.checkPassword(req.body.password);

      if (isPasswordValid) {
        return res.status(200).json({
          status: true,
          message: "Authentication successful",
          username: req.body.username,
        });
      } else {
        return res.status(401).json({
          status: false,
          message: "Invalid username or password",
        });
      }
    } catch (error) {
      return res.status(500).json({ error: error.message });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});

module.exports = app;
