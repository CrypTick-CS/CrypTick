const chai = require('chai');
const assert = chai.assert;
const should = chai.should;
const User = require('../models/userModel')
const bcrypt = require('bcrypt');
const saltRounds = 10;

describe('Create a User in the Database', function(){
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

  it('should hash the password', function(done){
    bcrypt.genSalt(saltRounds, function(err, salt){
      bcrypt.hash('testing', salt, async function(err, hash){
        if (err) throw new Error('There was an error saving the user in the database. Check your hash function.');
        else {
          const tempUser = new User({
            email: 'gareth@gareth.io',
            password: hash,
            startDate: Date.now(),
          });

          const result = await tempUser.save(function (err, result){
            if (err) throw new Error('There was an error saving the user in the database.')
            else {
              done()
            }
          })
        }
      });
    });
  });



// retrieve password from DB and then compare
    // const item = await User.findOne({email: 'gareth@gareth.io'})
    // console.log('item from find', item);
    // bcrypt.compare('testing', )
  // MAKE THE COMPARISON A SEPARATE TEST
  })


