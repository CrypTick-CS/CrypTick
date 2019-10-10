const mongoose = require('mongoose');

const historyItemSchema = new mongoose.Schema({
  time: {type: Date, default: Date.now},
  cryptoType: {type: String, required: true, default:"bitcoin"},
  transactionType: {type: String, required: true},
  cryptoQty: {type: mongoose.Decimal128, required: true},
  cryptoVal: {type: mongoose.Decimal128, required: true},
  dollarBalance: {type: mongoose.Decimal128, required: true},
  bitcoinBalance: {type: mongoose.Decimal128, required: true},
})

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  startDate: {type: Date, required: true, default: Date.now},
  history: {
    type: [historyItemSchema],
  },
  // add dollar balance and bitcoin balance
});

const User = mongoose.model('user', userSchema);

module.exports = User

