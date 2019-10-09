const express = require('express');
const localRouter = express.Router();
const userController = require('../controllers/userController');

localRouter.post('/signup', userController.createUser, (req, res, next)=>{
  res.status(200).json({
    item1: res.locals.user,
    item2: 'hello world'
  })
});

localRouter.post('/login', userController.verifyUser, (req, res, next)=>{
  res.status(200).json('verified made it through clean!')
})

module.exports = localRouter