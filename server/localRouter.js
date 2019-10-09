const express = require('express');
const localRouter = express.Router();
const userController = require('../controllers/userController');

localRouter.post('/signup', userController.createUser, (req, res, next)=>{
  res.status(200).json({
    dollarBalance: 100000,
    bitcoinBalance: 0
  })
});

localRouter.post('/login', userController.verifyUser, (req, res, next)=>{
  // res.status(200).json(res.locals)
  res.status(200).json('end of request')
  console.log('end of verifyUser')
})

module.exports = localRouter