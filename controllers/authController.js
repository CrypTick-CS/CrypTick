const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
const uuidv4 = require('uuid/v4')

dotenv.config({
  path: path.join(__dirname, '../.env')
});


const authController = {};

authController.verifySession = (req, res, next) => {
  // if session exists, verify it against what is in the database to make sure it's still valid
  //      if exists and is valid, next() -> move on to whatever they want to do
  // if session does NOT exist, respond with unauthorized and redirect to signup/login
  // 
  if (req.session) next()
  else return res.status(400).json()

};

authController.createSession = (req, res, next) => {
    req.session = session({
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: true
      },
      resave: false,
      saveUninitialized: false,
  });

  req.session.id = uuidv4();

  next();
}

module.exports = authController;
