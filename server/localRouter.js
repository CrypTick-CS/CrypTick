const express = require('express');
const localRouter = express.Router();
const userController = require('../controllers/userController');

localRouter.post('signup', userController.createUser, (req, res, next)=>{
  res.status(200).json()
});

localRouter.post('login', userController.verifyUser, (req, res, next)=>{
  res.status(200).json()
})