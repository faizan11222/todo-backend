const { body } = require("express-validator");

exports.validateTodo = {
  create: [body("text").notEmpty().withMessage("Todo text cannot be empty")],
  update: [
    body("completed")
      .isBoolean()
      .withMessage("Completed must be a boolean value"),
  ],
};
