const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const todoItemSchema = new Schema({
  id: { type: String, required: true, unique: true },
  value: { type: String, required: true },
  completed: { type: Boolean },
});

const TodoItem = mongoose.model("TodoItem", todoItemSchema);

module.exports = TodoItem;
