const mongoose = require('mongoose');
const path = require('path');

const dotenv = require('dotenv')
dotenv.config({
  path: path.join(__dirname, '../.env')
});

const dbConnection = process.env.DATABASE_URI;

mongoose.connect(dbConnection, {
  dbName: 'CrypTick',
  useNewUrlParser: true
})
.catch(err => console.log(err));

mongoose.connection.on('error', ()=>{
  console.error(error)
});

mongoose.connection.on('close', ()=>{
  console.log('the connection has been closed')
})