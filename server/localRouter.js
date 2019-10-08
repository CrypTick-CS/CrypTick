const express = require('express');
const localRouter = express.Router();
const userController = require('../controllers/userController');

localRouter.post('signup', userController.createUser)