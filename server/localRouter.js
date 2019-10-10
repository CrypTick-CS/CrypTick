const express = require('express');
const localRouter = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

localRouter.post('/signup', userController.createUser, authController.createSession, (req, res, next)=>{
  res.status(200).json({
    dollarBalance: 100000,
    bitcoinBalance: 0
  })
});

localRouter.post('/login', userController.verifyUser, authController.createSession, (req, res, next)=>{
  // res.status(200).json(res.locals)
  res.status(200).json('Login successful.')
})

// the verifySession would only occur on other requests. If they're logging in or signing up, they won't have a session yet.

module.exports = localRouter