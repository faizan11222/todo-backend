const { validationResult } = require("express-validator");
const Todo = require("../models/todo.model");

const todosController = {
  getAllTodos: async (req, res) => {
    try {
      const todos = await Todo.find();
      res.status(200).json(todos);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  addTodo: async (req, res) => {
    const { text } = req.body;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const newTodo = await Todo.create({ text });
      res.status(200).json(newTodo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },

  updateTodo: async (req, res) => {
    const { id } = req.params;

    // Validation
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const todo = await Todo.findByIdAndUpdate(
        id,
        { ...req.body },
        { new: true }
      );
      res.json(todo);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  },
  deleteTodo: async (req, res) => {
    const { id } = req.params;
    try {
      await Todo.findByIdAndDelete(id);
      res.json(id);
    } catch (error) {
      console.log(error);
      res.status(400).json({ error: "Bad Request" });
    }
  },
};

module.exports = todosController;
