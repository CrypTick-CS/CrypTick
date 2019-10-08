const bcrypt = require('bcrypt');
const saltRounds = 10;
const User = require('../models/userModel')

const userController = {};


userController.createUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {

    const userSearch = await User.findOne({'email': email});
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
       verifiedResult = await bcrypt.compare(password, hashedPassword);
    }

    if (!verifiedResult) return res.status(400).json('Invalid email or password.');

    res.locals.verifiedResult = verifiedResult;

    next()

  }
  catch(err){
    console.error(err);
  }
}
userController.getUser = (req, res, next) => {
}

userController.addTransaction = (req, res, next) => {
  // User buys or sells crypto
  // needs to add a new item to history, including TIME, and recalculated
  // portfolio data (dollarBalance, bitcoinBalance)


  // req Expectation:
  // body: {
    //   email: "potato@cannon.gov",
    //   transactionDetails: {
      //     cryptoTrpe: "BITCOIN",
      //     transactionType: "BUY",
      //     cryptoQty: 0.01,
      //     cryptoVal: 8675.309,
      //   }
      // }
    const user = User.find({ email: req.body.email });
    const newHistoryItem = {
      time: Date.now(),
      cryptoType: req.body.cryptoType,
      transactionType: req.body.transactionType,
      cryptoQty: req.body.cryptoQty,
      cryptoVal : req.body.cryptoVal,
    };
    const oldDollarBalance = user.history.last.dollarBalance;
    const newDollarBalance = oldDollarBalance - (req.body.cryptoQty * req.body.cryptoVal);
    const oldBitcoinBalance = user.history.last.bitcoinBalance;
    let newBitcoinBalance;
    if (req.body.cryptoType === "BITCOIN") {
      newBitcoinBalance = oldBitcoinBalance + req.body.cryptoQty;
    } else {
      newBitcoinBalance = oldBitcoinBalance;
    }

    newHistoryItem.bitcoinBalance = newBitcoinBalance;
    newHistoryItem.dollarBalance = newDollarBalance;

    user.history.push(newHistoryItem);
    user.save((err)=>{
      if (err) {res.status(400).send(err)} else {
        res.locals.newBalances = {bitcoinBalance: newBitcoinBalance, dollarBalance: newDollarBalance}
        next();
      }
    })
}

module.exports = userController;
