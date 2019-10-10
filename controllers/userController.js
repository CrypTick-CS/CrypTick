const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')

const userController = {};


userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    const userSearch = await User.findOne({'email': email});
    console.log('userSearch', userSearch);
    if (userSearch) return res.status(400).json('An account with this e-mail already exists. Please check your password.');
    else {
      const hashedPassword = await bcrypt.hash(password, saltRounds)
      const newUser = new User({
        email,
        password: hashedPassword,
        startDate: Date.now()
      })
  
      newUser.save();
  
       next();
    }

  }
  catch(err){
    console.error(err)
    return res.status(500).json('Server error. Please try again.')
  }

}

userController.verifyUser = async (req, res, next) => {

  const { email, password } = req.body;
  try {
    const result = await User.findOne({'email': email});
    let verifiedResult = false;
    if (result){
      const hashedPassword = result.password;
      console.log('hashedPassword in if block: ', hashedPassword);
       verifiedResult = await bcrypt.compare(password, hashedPassword);
       console.log('verifiedResult inside if block: ', verifiedResult);
    }

    if (!verifiedResult) return res.status(400).json('Invalid email or password.');

    res.locals.verifiedResult = verifiedResult;

    next()

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