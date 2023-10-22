const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const router = require("./router");

const app = express();

app.use(cors());
app.use(express.json());

// MongoDB Connection
mongoose
  .connect("mongodb://127.0.0.1:27017/todo-app", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("database connected"));

app.use("/api", router);

app.listen(8080, () => {
  console.log("🚀 server is listening at PORT: 8080");
});

module.exports = app;
