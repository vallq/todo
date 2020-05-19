const express = require("express");
const router = express.Router();
const TodoItem = require("../models/todoItem.model");

const getAllTodoItems = async (req, res) => {
  const includesAll = new RegExp(/./);
  const todoList = await TodoItem.find(
    { id: includesAll },
    "id value completed"
  );
  res.status(200).send(todoList);
}

const postNewTodoItem = async (req, res) => {
  try {
    const itemToPost = new TodoItem(req.body);
    await itemToPost.save();
    res.status(201).send(itemToPost);
  } catch (err) {
    err.message = new Error("unable to post item");
    err.statusCode = 400;
    next(err);
  }
}

router.get("/",getAllTodoItems);
router.post("/", postNewTodoItem);

router.use((err, req, res, next) => {
  next(err);
});

module.exports = router;
