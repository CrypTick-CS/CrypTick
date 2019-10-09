const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')

const userController = {};


userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;
// can run asynchronously because I don't need this data back for anything
    const savedUser = await bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash(password, salt, function(err, hash){
        console.log('inside bcrypt.hash')
        if (err) console.error('There was an error saving the user in the database. Check your hash function.');
        else {
          const newUser = new User({
            email,
            password: hash,
            startDate: Date.now()
          });
          newUser.save()
          .then(result=>{
            // console.log('result inside newUser.save() : ', result)
            return result
          })
          .catch(err=>console.log(err))
          // res.locals.savedUser = result;
        }
      });
    });

  next();

}

userController.verifyUser = async (req, res, next) => {

  const { email, password } = req.body;

    const result = await User.findOne({'email': email}, function(err, docs){
        if (err) console.error(err);
    });
    const hashedPassword = result.password;

    const verifiedResult = await bcrypt.compare(password, hashedPassword)
    .then(result=>{
      console.log('result', result);
      if (result) return true;
    })
    .catch(err=>{
      console.error(err);
      res.status(400).json('Invalid email or password')
    });
    
    res.locals.verifiedResult = verifiedResult;
    next()

}

userController.addTransaction = (req, res, next) => {
// User buys or sells crypto
// needs to add a new item to history, including recalculated
// portfolio data (cryptoQty, cryptoVal, dollarBalance, bitcoinBalance)
}

module.exports = userController;
