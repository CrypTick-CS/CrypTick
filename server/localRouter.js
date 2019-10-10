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
  res.status(200).json({
    email: req.body.email,
    statusCode: 200,
    authenticated: true,
  });
})

localRouter.post('/test', (req, res, next)=>{
  console.log('req object:', req)
  res.status(200).json('request complete');
})


// localRouter.get('/transaction', userController.verifyUser, userController.addTransaction, (req, res, next)=>{
  localRouter.post('/transaction', userController.addTransaction, (req, res, next)=>{
    console.log("res.locals", res.locals);
    res.status(200).json(res.locals.newBalances);
});


// the verifySession would only occur on other requests. If they're logging in or signing up, they won't have a session yet.

module.exports = localRouter
