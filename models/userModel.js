const mongoose = require('mongoose');

const historyItemSchema = new mongoose.Schema({
  time: {type: Date, default: Date.now},
  cryptoType: {type: String, required: true, default:"BITCOIN"},
  transactionType: {type: String, required: true},
  cryptoQty: {type: Number},
  cryptoVal: {type: Number},
  dollarBalance: {type: Number, required: true},
  bitcoinBalance: {type: Number, required: true}
})

const userSchema = new mongoose.Schema({
  email: {type: String, required: true},
  password: {type: String, required: true},
  startDate: {type: Date, required: true, default: Date.now},
  history: {
    type: [historyItemSchema],
  },
});

const User = mongoose.model('user', userSchema);

module.exports = User;
