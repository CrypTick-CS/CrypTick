const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')

const userController = {};

userController.addNumbers = (num1, num2) => {

}

userController.createUser = (req, res, next) => {
  const { email, password } = req.body;

  try {
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        if (err) throw new Error('There was an error saving the user in the database. Check your hash function.');
        else {
          User.save({
            email,
            password: hash,
            startDate: Date.now(),
          }
          .catch(err=>{throw err})
          );
        }
      });
    });
  }
  catch(err){
    console.error(err);
  }

}

userController.addTransaction = (req, res, next) => {
// User buys or sells crypto
// needs to add a new item to history, including recalculated
// portfolio data (cryptoQty, cryptoVal, dollarBalance, bitcoinBalance)
}

module.exports = userController;
