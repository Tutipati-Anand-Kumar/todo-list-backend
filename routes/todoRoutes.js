// server/routes/todoRoutes.js
const express = require('express');
const { addTodo, getTodo, updateTodo, deleteTodo } = require('../controllers/todoController');

const router = express.Router();
router.post('/', addTodo);
router.get('/', getTodo);
router.put('/:id', updateTodo);
router.delete('/:id', deleteTodo);

module.exports = router;