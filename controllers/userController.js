const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')

const userController = {};


userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;

    const savedUser = await bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        if (err) console.error('There was an error saving the user in the database. Check your hash function.');
        else {
          const newUser = new User({
            email,
            password: hash,
            startDate: Date.now()
          })
          newUser.save()
          .then(result=>{
            console.log('result', result)
            return result
          })
          .catch(err=>console.log(err))
          // res.locals.savedUser = result;
        }
      });
    });
    res.locals.user = savedUser

  next();

}

userController.verifyUser = async (req, res, next) => {

  const { email, password } = req.body;
  console.log('req.body: ', req.body)

    const result = await User.findOne({'email': email}, function(err, response){
      if (err){
       console.error(err);
      }
      else {
        bcrypt.compare(password, response.password, function(err, result){
          if (err){
            return res.status(400).json('Invalid email or password.');
          }
          else {
            console.log(result);
            console.log('result.password', res.password)
            console.log('about to hit next, inside the else block')
            // return next()
            // send user over to the authentication/cookie/session middleware to get their session
          }
        });
      }
    });
  next()

}

userController.addTransaction = (req, res, next) => {
// User buys or sells crypto
// needs to add a new item to history, including recalculated
// portfolio data (cryptoQty, cryptoVal, dollarBalance, bitcoinBalance)
}

module.exports = userController;
