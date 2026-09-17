const express = require("express");

const cors = require("cors");

const app = express();

const mongoose = require("mongoose");

const url = "mongodb://localhost:27017/login_register";

mongoose.connect(url).then (() => {
      console.log("connected to database");
  }).catch((err) => {
      console.log("Can't connecting to database",err);
  });

app.use(cors());
app.use(express.json());

const usersRouter = require("./routers/user.router");

app.use("/api/users", usersRouter);

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});