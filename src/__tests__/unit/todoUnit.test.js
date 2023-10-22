const todosController = require("../../controllers/todo.controller");
const Todo = require("../../models/todo.model");
const { validationResult } = require("express-validator");

jest.mock("../../models/todo.model", () => ({
  find: jest.fn(),
  findById: jest.fn(),
  create: jest.fn(),
  findByIdAndUpdate: jest.fn(),
  findByIdAndDelete: jest.fn(),
}));

jest.mock("express-validator", () => ({
  validationResult: jest.fn(),
}));

describe("todosController", () => {
  let mockRes;

  beforeEach(() => {
    mockRes = {
      json: jest.fn(),
      status: jest.fn().mockReturnThis(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("getAllTodos should return todos", async () => {
    const mockTodos = [{ _id: "1", text: "Test Todo", completed: false }];
    Todo.find.mockResolvedValueOnce(mockTodos);
    const todos = await todosController.getAllTodos(null, mockRes);
    expect(Todo.find).toHaveBeenCalledTimes(1);
    expect(mockRes.json).toHaveBeenCalledWith([
      { _id: "1", completed: false, text: "Test Todo" },
    ]);
  });

  it("addTodo should create a new todo", async () => {
    const mockTodoData = { text: "New Todo" };
    const createdTodo = { _id: "2", ...mockTodoData, completed: false };
    Todo.create.mockResolvedValueOnce(createdTodo);
    validationResult.mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });
    await todosController.addTodo({ body: mockTodoData }, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith(createdTodo);
  });

  it("updateTodo should update an existing todo", async () => {
    const mockTodoId = "1";
    const mockUpdateData = { completed: true };
    const updatedTodo = { _id: mockTodoId, text: "Test Todo", completed: true };
    Todo.findByIdAndUpdate.mockResolvedValueOnce(updatedTodo);
    validationResult.mockReturnValue({
      isEmpty: jest.fn().mockReturnValue(true),
      array: jest.fn().mockReturnValue([]),
    });
    const todo = await todosController.updateTodo(
      {
        params: { id: mockTodoId },
        body: mockUpdateData,
      },
      mockRes
    );
    expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(
      mockTodoId,
      mockUpdateData,
      { new: true }
    );
    expect(mockRes.json).toHaveBeenCalledWith({
      _id: "1",
      completed: true,
      text: "Test Todo",
    });
  });

  it("addTodo should handle validation errors", async () => {
    const invalidTodoData = { text: "" }; // Invalid data that triggers validation error
    const validationErrors = [{ msg: "Text is required", param: "text" }]; // Example validation errors

    validationResult.mockReturnValueOnce({
      isEmpty: () => false,
      array: () => validationErrors,
    });

    await todosController.addTodo({ body: invalidTodoData }, mockRes);

    expect(mockRes.status).toHaveBeenCalledWith(400);
  });

  it("deleteTodo should delete an existing todo", async () => {
    const mockTodoId = "1";
    Todo.findByIdAndDelete.mockResolvedValueOnce({
      _id: mockTodoId,
      text: "Test Todo",
      completed: false,
    });
    const deletedTodo = await todosController.deleteTodo(
      {
        params: { id: mockTodoId },
      },
      mockRes
    );

    expect(Todo.findByIdAndDelete).toHaveBeenCalledWith(mockTodoId);
    expect(mockRes.json).toHaveBeenCalledWith(mockTodoId);
  });
});
