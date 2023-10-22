const { body } = require("express-validator");

exports.validateTodo = {
  create: [body("text").notEmpty().withMessage("Todo text cannot be empty")],
  update: [body("text").isString().withMessage("text is missing")],
  toggle: [
    body("completed")
      .isBoolean()
      .withMessage("Completed must be a boolean value"),
  ],
};
