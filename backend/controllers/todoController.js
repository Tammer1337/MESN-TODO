const asyncHandler = require("express-async-handler");

const Todo = require("../models/todoModel");
const User = require("../models/userModel");

// @desc   Get all todos
// @route  GET /api/todos
// @access Private
const getTodos = asyncHandler(async (req, res) => {
  const todos = await Todo.find({ user: req.user.id });

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
    user: req.user.id,
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
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Validate if logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized for this action");
  }

  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });

  res.status(200).json(updatedTodo);
});

// @desc   Delete a todo
// @route  DELETE /api/todos/:id
// @access Private
const deleteTodo = asyncHandler(async (req, res) => {
  const todo = await Todo.findById(req.params.id);

  if (!todo) {
    res.status(400);
    throw new Error("Todo not found");
  }

  const user = await User.findById(req.user.id);

  // Check for user
  if (!user) {
    res.status(401);
    throw new Error("User not found");
  }

  // Validate if logged in user matches the todo user
  if (todo.user.toString() !== user.id) {
    res.status(401);
    throw new Error("User not authorized for this action");
  }

  await todo.remove();
  res.status(200).json({ message: `Deleted Todo with the Title of "${todo.title}" and the ID of "${todo.id}"` });
});

module.exports = {
  getTodos,
  setTodo,
  updateTodo,
  deleteTodo,
};
