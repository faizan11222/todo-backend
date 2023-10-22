const express = require("express");
const router = express.Router();
const todoRouter = require("./routes/todo.routes");

router.use("/todos", todoRouter);

module.exports = router;
