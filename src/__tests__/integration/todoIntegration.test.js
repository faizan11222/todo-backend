const request = require("supertest");
const app = require("../../server");
const mongoose = require("mongoose");
const Todo = require("../../models/todo.model");

beforeAll(async () => {
  if (mongoose.connection.readyState === 0) {
    await mongoose.connect("mongodb://127.0.0.1:27017/todo-app-test", {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }
});

afterEach(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.db.dropDatabase();
  }
});

afterAll(async () => {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.connection.close();
  }
});
describe("Todos API", () => {
  test("should get todos list", async () => {
    const response = await request(app).get("/api/todos");
    expect(response.status).toBe(200);
  });

  test("should add a new todo", async () => {
    const response = await request(app)
      .post("/api/todos")
      .send({ text: "Test Todo" });
    expect(response.status).toBe(200);
    expect(response.body.text).toBe("Test Todo");
  });

  test("should update a todo", async () => {
    const todo = new Todo({ text: "Test Todo" });
    await todo.save();

    const response = await request(app)
      .put(`/api/todos/${todo._id}`)
      .send({ completed: true });
    expect(response.status).toBe(200);
    expect(response.body.completed).toBe(true);
  });

  test("should delete a todo", async () => {
    const todo = new Todo({ text: "Test Todo" });
    await todo.save();

    const response = await request(app).delete(`/api/todos/${todo._id}`);
    expect(response.status).toBe(200);

    const todos = await Todo.find();
    expect(todos).toEqual([]);
  });
});
