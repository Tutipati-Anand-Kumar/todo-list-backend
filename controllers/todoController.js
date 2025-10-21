// server/controllers/todoController.js
const Todo = require('../models/todoModel');
const mongoose = require('mongoose');

const addTodo = async (req, res) => {
    try {
        const { title, description, assignee, priority, category, dueDate, estimatedTime, tags, createdBy } = req.body;

        if (!title || !description || !createdBy) {
            return res.status(400).json({ message: 'Title, Description, and CreatedBy are required' });
        }

        const todo = await Todo.create(req.body);

        res.status(201).json({ 
            status: 201, 
            data: { ...todo.toObject(), id: todo._id }, 
            message: "Todo added successfully"
        });
    } catch (error) {
        console.error("Add Todo Error:", error);
        res.status(500).json({ message: 'Server error when adding todo' });
    }
};

const getTodo = async (req, res) => {
    try {
        const { createdBy } = req.query;

        if (!createdBy) {
            return res.status(200).json({ data: [], status: 200 }); 
        }

        const todos = await Todo.find({ createdBy }).sort({ createdAt: -1 });
        const formattedTodos = todos.map(todo => ({
            ...todo.toObject(),
            id: todo._id, 
            dueDate: todo.dueDate ? new Date(todo.dueDate).toISOString().split('T')[0] : '', 
        }));

        res.status(200).json({ data: formattedTodos, status: 200 });

    } catch (error) {
        console.error("Get Todo Error:", error);
        res.status(500).json({ message: 'Server error when fetching todos' });
    }
};

const updateTodo = async (req, res) => {
    try {
        const todoId = req.params.id; 
        const payload = req.body;

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ message: 'Invalid Todo ID format' });
        }

        delete payload.id; 
        const updatedTodo = await Todo.findByIdAndUpdate(
            todoId,
            { ...payload, updatedAt: Date.now() },
            { new: true, runValidators: true }
        );

        if (!updatedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        const formattedTodo = {
            ...updatedTodo.toObject(),
            id: updatedTodo._id,
            dueDate: updatedTodo.dueDate ? new Date(updatedTodo.dueDate).toISOString().split('T')[0] : '',
        };

        res.status(200).json({ 
            status: 200,
            data: formattedTodo, 
            message: 'Todo updated successfully' 
        });
        
    } catch (error) {
        console.error("Update Todo Error:", error);
        res.status(500).json({ message: 'Server error during update' });
    }
};

const deleteTodo = async (req, res) => {
    try {
        const todoId = req.params.id;

        if (!mongoose.Types.ObjectId.isValid(todoId)) {
            return res.status(400).json({ message: 'Invalid Todo ID format' });
        }

        const deletedTodo = await Todo.findByIdAndDelete(todoId);

        if (!deletedTodo) {
            return res.status(404).json({ message: 'Todo not found' });
        }

        res.status(200).json({ message: 'Todo deleted successfully', status: 200 });

    } catch (error) {
        console.error("Delete Todo Error:", error);
        res.status(500).json({ message: 'Server error during delete' });
    }
};

module.exports = { addTodo, getTodo, updateTodo, deleteTodo };