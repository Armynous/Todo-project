const express = require("express");
const todoContoller = require("../controllers/todoControllers");

const router = express.Router();

router.get("/", todoContoller.getAllTodo);

router.post("/", todoContoller.createTodo);

router.patch("/:todoId", todoContoller.updateTodo);

router.delete("/:todoId", todoContoller.deleteTodo);

module.exports = router;