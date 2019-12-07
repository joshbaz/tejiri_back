const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')


//Registration-Operation
router.post('/register', userController.registerUser);


//Login-Operation
router.post('/login', userController.loginUser)

//single-selection
router.get('/:id', userController.getUserByID)


//All User-selection
router.get('/', userController.getAllUsers);


module.exports = router;

