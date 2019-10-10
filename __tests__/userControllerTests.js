// const request = require('supertest');
// const app = require('../server/app');
const should = require('should');
const sinon = require('sinon');
const userController = require('../controllers/userController');

describe('userController methods', () => {
  describe('addTransaction', () => {

    it("return a 200 when given valid data", () => {
      // mock user object
      const User = function (user) { this.save = () => {}};

      const req = {
        body: {
          email: "potato@cannon.gov",
          transactionDetails: {
            cryptoTrpe: "BITCOIN",
            transactionType: "BUY",
            cryptoQty: 0.01,
            cryptoVal: 8675.309,
          }
        }
      }

      const res = {
        status: sinon.spy(),
        send: sinon.spy(),
        json: sinon.spy()
      };

      const controller = userController;
      controller.addTransaction(req, res);
      res.status.calledWith(200).should.equal(true);
      // res.send.calledWith()
    })
  })

})

// const user = new user({
//   email: "mondays@thingsihate.net",
//   startDate: 1570555712987,
//   password: "abc123",
//   history: []
// });

// const fakeValidHistoryArray = [
//   {
//     time: 1570556270570,
//     cryptoType: "BITCOIN",
//     transactionType: "BUY",
//     cryptoQty: 0.01,
//     cryptoVal: 8675.309,
//     dollarBalance: 90.00,
//     bitcoinBalance: 0.01,
//   }, {
//     time: Date.now(),
//     cryptoType: "BITCOIN",
//     transactionType: "BUY",
//     cryptoQty: 0.01,
//     cryptoVal: 8765.43,
//     dollarBalance: 80.00,
//     bitcoinBalance: 0.02,
//   }
// ];
