const express = require("express");
const router = express.Router();
const TodoItem = require("../models/todoItem.model");

router.get("/", async (req, res) => {
  const includesAll = new RegExp(/./);
  const todoList = await TodoItem.find(
    { id: includesAll },
    "id value completed"
  );
  res.status(200).send(todoList);
});

module.exports = router;
