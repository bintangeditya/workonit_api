const express = require('express');
const router = express.Router();

const taskController = require('../controllers/task.controller');

router.get('/userId/:id_user/bookId/:id_book',taskController.getTaskByIdBookIdUser);
router.post('/new', taskController.createTask);
router.delete('/:id_task',taskController.deleteTask)
router.post('/check',taskController.updateCheck)
router.post('/update',taskController.updateTask)

module.exports = router;