# Backend API

This project is an Express.js backend built with Node.js. It uses Mongoose for MongoDB connectivity, has CORS support, and includes input validation via express-validator.

## Available Scripts

In the project directory, you can run:

### `npm start`

Starts the backend server in development mode.
By default, it will run on http://localhost:8080. Any changes you make to the source code will be automatically reflected due to nodemon.

# Launches the Jest test runner.

How to Run Tests
This project uses Jest for unit testing. To run tests, use the following command:

### `npm test`

You can use this command to run all the unit and integration tests for the backend. For more details on how the tests are structured, refer to the **tests** directory.

API Endpoints
GET /api/todos: Get all todos.
POST /api/todos: Create a new todo.
GET /api/todos/:id: Get a specific todo.
PUT /api/todos/:id: Update a todo.
DELETE /api/todos/:id: Delete a todo.
