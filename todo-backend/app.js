const express = require("express");
const apiEndpoints = require("./apiEndpoints");
const todoListRouter = require("./routes/todoList.route");
const cors = require('cors');
const app = express();

app.use(cors());
app.use(express.json());
app.use("/todolist", todoListRouter);

app.get("/", (req, res) => {
  res.send(apiEndpoints);
});

//error handling
app.use((err, req, res, next) => {
  res.status(err.statusCode || 500);
  console.log(err);
  if (err.statusCode) {
    res.send({ error: err.message });
  } else {
    res.send({ error: "internal server error" });
  }
});

module.exports = app;
