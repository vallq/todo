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
};

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
};

const updateTodoItem = async (req, res) => {
  const dataToUpdate = req.body;
  const updatedItem = await TodoItem.findOneAndUpdate(
    { id: req.params.id },
    dataToUpdate,
    { new: true }
  );
  res.status(200).send(updatedItem);
};

const deleteTodoItem = async (req, res) => {
  const todoItemId = req.params.id;
  const deletedItem = await TodoItem.findOneAndDelete({ id: todoItemId });
  res.status(200).send(deletedItem);
};
const clearCompletedTodoItems = async (req, res) => {
  const deleteManyResponse = await TodoItem.deleteMany({ completed: true });
  res.status(200).send(deleteManyResponse);
};

router.get("/", getAllTodoItems);
router.post("/", postNewTodoItem);
router.patch("/:id", updateTodoItem);
router.delete("/:id", deleteTodoItem);
router.delete("/", clearCompletedTodoItems);

router.use((err, req, res, next) => {
  next(err);
});

module.exports = router;
