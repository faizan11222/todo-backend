const express = require("express");
const todoRouter = express.Router();
const todosController = require("../../controllers/todo.controller");
const { validateTodo } = require("../../validations/todo.validations");

todoRouter.get("/", todosController.getAllTodos);
todoRouter.post("/", validateTodo.create, todosController.addTodo);
todoRouter.put("/:id", validateTodo.update, todosController.updateTodo);
todoRouter.patch("/:id", validateTodo.toggle, todosController.updateTodo);
todoRouter.delete("/:id", todosController.deleteTodo);

module.exports = todoRouter;
