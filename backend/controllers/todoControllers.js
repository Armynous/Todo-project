const todoService = require("../services/todoService");

const getAllTodo = async (req, res) => {
    try {
        const allTodo = await todoService.getAllTodo();
        res.status(200).json({ status: 200, data: allTodo });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

const createTodo = async (req, res) => {
    try {
        const todoData = req.body;
        const createdTodo = await todoService.createTodo(todoData);

        res.status(201).json({ status: 201, data: createdTodo });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const updatedData = req.body;
        const updatedTodo = await todoService.updateTodo(todoId, updatedData);
        res.status(200).json({ status: 200, data: updatedTodo });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.todoId;
        const updatedTodo = await todoService.deleteTodo(todoId);
        res.status(200).json({ status: 200 });
    } catch (error) {
        res.status(500).json({ status: 500, error: error.message });
    }
}

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo,
}