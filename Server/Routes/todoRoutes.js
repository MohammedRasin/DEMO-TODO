const express = require('express');
const router = express.Router();
const {
  todoCreate,
  getAllTodos,
  DeleteTodoById,
  updateTodoById,
} = require('../Controllers/todoControllers');

router.post('/', todoCreate);
router.get('/', getAllTodos);
router.delete('/:id', DeleteTodoById);
router.patch('/:id', updateTodoById);

module.exports = router;
