const session = require('express-session');
const dotenv = require('dotenv');
const path = require('path');
// const uuidv4 = require('uuid/v4')

dotenv.config({
  path: path.join(__dirname, '../.env')
});


const authController = {};

authController.verifySession = (req, res, next) => {

  if (req.session) next()
  else return res.status(400).json()

};

authController.createSession = (req, res, next) => {
    req.session = session({
      genid: (req)=>{
        return genuuid()
      },
      secret: process.env.SESSION_SECRET,
      cookie: {
        httpOnly: true
      },
      resave: false,
      saveUninitialized: false,
  });

  next();
}

module.exports = authController;
