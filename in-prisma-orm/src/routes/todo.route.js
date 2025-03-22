const express = require("express");
const router = express.Router();
const {
  createTodo,
  getAllTodos,
  updateTodo,
  deleteTodo,
} = require("@controllers/todo-controller");



router.route("/todo").get(getAllTodos).post(createTodo);

router.put("/todo/:id", updateTodo)
router.delete("/todo/:id", deleteTodo)

module.exports = router