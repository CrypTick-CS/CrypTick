const mongoose = require('mongoose');
const path = require('path');

const dotenv = require('dotenv')
dotenv.config({
  path: path.join(__dirname, '../.env')
});

const dbURI = process.env.DATABASE_URI;


const dbConnection = ()=>{

  mongoose.connect(dbURI, {
    dbName: 'CrypTick',
    useNewUrlParser: true
  })
  .catch(err => console.log(err));
  
  mongoose.connection.on('open', ()=>{
    console.log('Connected to database!')
  })
  
  mongoose.connection.on('error', ()=>{
    console.error(error)
  });
  
  mongoose.connection.on('close', ()=>{
    console.log('the connection has been closed')
  });

}

module.exports = dbConnection