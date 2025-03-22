const todoService = require("@services/user.service");

const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

const createTodo = asyncHandler(async (req, res) => {
  const create = await todoService.createTodo(req.body);
  return res.status(201).json(create);
});

const deleteTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const deleted = await todoService.deleteTodo(id);
  return res.status(200).json({ message: "Todo deleted", data: deleted });
});

const updateTodo = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const updated = await todoService.updateTodo(id, req.body);
  return res.status(200).json({ message: "Todo updated", data: updated });
});

const getAllTodos = asyncHandler(async (req, res) => {
  const todos = await todoService.getAllTodos();
  return res.status(200).json({ message: "Get all todos", data: todos });
});

module.exports = { createTodo, getAllTodos, updateTodo, deleteTodo };
