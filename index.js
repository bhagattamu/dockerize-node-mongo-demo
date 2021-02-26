const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const UserModel = require("./model/user");

const app = express();

app.use(bodyParser.json());

// connecting mongodb
mongoose.connect("mongodb://localhost/testdb");

app.use("/", express.static("html"));

app.post("/api/user", (req, res) => {
  const user = new UserModel(req.body);
  user.save((err, doc) => {
    res.status(200).json({
      user: doc,
    });
  });
});

app.get("/api/user/all", (req, res) => {
  UserModel.find().exec((err, doc) => {
    res.status(200).json({
      users: doc,
    });
  });
});

app.listen(3000, () => {
  console.log("Server running at port: 3000");
});
