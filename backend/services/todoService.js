const Todo = require("../models/todoModel");

const getAllTodo = () => {

    return Todo.find({});
}

const createTodo = async (todoData) => {
    try {
        const newTodo = new Todo(todoData);
        const createdTodo = await newTodo.save();
        console.log(createdTodo);

        return createdTodo;
    } catch (error) {
        throw error;
    }
}

const updateTodo = (todoId, updatedData) => {
    return Todo.findByIdAndUpdate(todoId, updatedData, { new: true });
}

const deleteTodo = (todoId) => {
    return Todo.findOneAndDelete({ _id: todoId });
}

module.exports = {
    getAllTodo,
    createTodo,
    updateTodo,
    deleteTodo,
}