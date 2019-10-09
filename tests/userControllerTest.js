const chai = require('chai');
const assert = chai.assert;
const should = chai.should;
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;
const database = require('../database/database');
const mongoose = require('mongoose');
const path = require('path');

const dotenv = require('dotenv')
dotenv.config({
  path: path.join(__dirname, '../.env')
});
const dbConnection = process.env.DATABASE_URI;

describe('Create a User in the Database', function(){
  before('connect to database', function(done){
    mongoose.connect(dbConnection, {
      dbName: 'CrypTick',
      useNewUrlParser: true
    })
    .then(done())
    .catch(err=>done(err));

  });

  it('should save a user in the database without error', async function (done){
    const newUser = new User({
      email: 'gareth@gareth.io',
      startDate: Date.now(),
      password: 'testing'
    });

    const saved = await newUser.save()
    .then(done())
    .catch(err=>done(err))

  });

  it('should hash the password and store the hashed password in the database', function(done){
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash('testing', salt, function(err, hash){
        if (err) done(err);
        else {
          const anotherUser = new User({
            email: 'testmuffin@test.io',
            startData: Date.now(),
            password: hash,
          });

          anotherUser.save(function(err, res){
            if (err) done(err)
            else done();
          });
        }
      });
    });
  });
})

  describe('Compare hashed password with inputted password to check if they match', function(){
    before('create a user in the database and find them', function(done){
      bcrypt.genSalt(saltRounds, function(err, salt){
        bcrypt.hash('testing', salt, function(err, hash){
          if (err) done(err);
          else {
            const anotherUser = new User({
              email: 'testmuffin@test.io',
              startData: Date.now(),
              password: hash,
            });
  
            anotherUser.save(function(err, res){
              if (err) done(err)
              else done();
            });
          }
        });
      });
    });
    });
    
    it('It should compare the db password with user inputted password', function(done){
      
      const password = 'testing';
        User.findOne({email: 'testmuffin@test.io'}, function(err, res){
          if (err) done(err);
          else {
            bcrypt.compare(password, res.password, function(err, response){
              if (err) done(err);
              else {
                console.log(response);
                console.log('res.password', res.password)
                done()
              }
            });
          }
        });
    });


