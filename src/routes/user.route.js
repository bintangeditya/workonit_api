const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

// get user by email
router.get('/:email',userController.getUserByEmail);
router.post('/login', userController.login);

module.exports = router;