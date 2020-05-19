const express = require("express");
const app = express();
const apiEndpoints = require("./apiEndpoints");
const todoListRouter = require("./routes/todoList.route");


app.use(express.json());

app.get("/", (req, res) => {
  res.send(apiEndpoints);
});

app.use("/todolist", todoListRouter);

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
