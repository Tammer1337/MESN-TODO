const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoModel");

// @desc   Get all todos
// @route  GET /api/todos
// @access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find();

  res.status(200).json(todos);
});

// @desc   Set a todo
// @route  POST /api/todos
// @access Private
const setTodo = asyncHandler(async (req, res) => {
  if (!req.body.title) {
    res.status(400);
    throw new Error("Title is required");
  }

  if (!req.body.description) {
    res.status(400);
    throw new Error("Description is required");
  }

  const todo = await Todo.create({
    title: req.body.title,
    description: req.body.description,
    completed: req.body.completed,
  });

  res.status(200).json(todo);
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
