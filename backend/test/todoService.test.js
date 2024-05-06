const todoService = require('../services/todoService');
const Todo = require('../models/todoModel');

const { updateTodo } = require('../services/todoService');

jest.mock('../models/todoModel');

describe('getAllTodo', () => {
    it('should return all todo items', async () => {
        const mockTodoData = [
            {
                _id: '60fe4d0b20e641036c3e6fb8',
                title: 'Test Todo 1',
                description: 'Test description 1',
                completed: false,
                createdAt: '2022-01-01T00:00:00.000Z',
                updatedAt: '2022-01-01T00:00:00.000Z',
            },
            {
                _id: '60fe4d0b20e641036c3e6fb9',
                title: 'Test Todo 2',
                description: 'Test description 2',
                completed: true,
                createdAt: '2022-01-02T00:00:00.000Z',
                updatedAt: '2022-01-02T00:00:00.000Z',
            },
        ];

        Todo.find.mockResolvedValue(mockTodoData);

        const result = await todoService.getAllTodo();

        expect(result).toEqual(mockTodoData);
        expect(Todo.find).toHaveBeenCalledTimes(1);
    });
});

describe('createTodo', () => {
    it('should create a new todo item', async () => {
        const mockTodoData = {
            title: 'Test Todo',
            description: 'Test description',
            completed: false,
        };

        const mockCreatedTodo = {
            _id: '60fe4d0b20e641036c3e6fb8',
            title: 'Test Todo',
            description: 'Test description',
            completed: false,
            createdAt: '2022-01-01T00:00:00.000Z',
            updatedAt: '2022-01-01T00:00:00.000Z',
        };

        Todo.create.mockResolvedValue(mockCreatedTodo);

        const result = await todoService.createTodo(mockTodoData);

        expect(result).toEqual(mockCreatedTodo);
        expect(Todo.create).toHaveBeenCalledWith(mockTodoData);
    });
});

describe('updateTodo function', () => {
    it('should update a todo', async () => {
        // Mock data
        const todoId = 'todo_id_here';
        const updatedData = {
            title: 'Updated title',
            description: 'Updated description',
            completed: true,
        };
        const updatedTodo = {
            _id: 'todo_id_here',
            title: 'Updated title',
            description: 'Updated description',
            completed: true,
            createdAt: new Date(),
            updatedAt: new Date(),
        };

        // Mock the findByIdAndUpdate method to return the updated todo
        Todo.findByIdAndUpdate.mockResolvedValue(updatedTodo);

        // Call the updateTodo function
        const result = await updateTodo(todoId, updatedData);

        // Assert that findByIdAndUpdate was called with the correct parameters
        expect(Todo.findByIdAndUpdate).toHaveBeenCalledWith(todoId, updatedData, { new: true });

        // Assert that the result matches the updated todo
        expect(result).toEqual(updatedTodo);
    });
});

describe('deleteTodo', () => {
    it('should delete an existing todo item', async () => {
        const mockTodoId = '60fe4d0b20e641036c3e6fb8';

        Todo.findOneAndDelete.mockResolvedValue(true);

        const result = await todoService.deleteTodo(mockTodoId);

        expect(result).toBe(true);
        expect(Todo.findOneAndDelete).toHaveBeenCalledWith({ _id: mockTodoId });
    });
});