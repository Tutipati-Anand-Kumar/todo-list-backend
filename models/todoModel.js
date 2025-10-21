// server/models/todoModel.js
const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    assignee: { type: String },
    priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
    category: { type: String },
    dueDate: { type: Date },
    estimatedTime: { type: String },
    tags: { type: String },
    createdBy: { type: String, required: true },
    isCompleted: { type: Boolean, default: false }, 
}, { timestamps: true });

const Todo = mongoose.model('Todo', todoSchema);
module.exports = Todo;