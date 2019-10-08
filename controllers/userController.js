const mongoose = require("mongoose");
const User = require("../models/userModel");

const userController = {};

userController.createUser = (req, res, next) => {

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
    const newBitcoinBalance;
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
