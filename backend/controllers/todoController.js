const asyncHandler = require("express-async-handler");

// @desc   Get all todos
// @route  GET /api/todos
// @access Private
const getTodos = asyncHandler(async (req, res) => {
  res.status(200).json({ message: "Get Todos" });
});

// @desc   Set a todo
// @route  POST /api/todos
// @access Private
const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title is required");
  }
  res.status(200).json(req.body);
});

// @desc   Update a todo
// @route  PUT /api/todos/:id
// @access Private
const updateTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update Goal ${req.params.id}` });
});

// @desc   Delete a todo
// @route  DELETE /api/todos/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete Goal ${req.params.id}` });
});

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
};
