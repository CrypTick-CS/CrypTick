const mongoose = require('mongoose');
const path = require('path');

require('dotenv').config({
  path: path.join(__dirname, '../.env')
});

const dbConnection = process.env.DATABASE_URI;
console.log('dbConnection: ', dbConnection);
console.log('mongoose object', mongoose);

mongoose.connect(dbConnection, {
  dbName: 'CrypTick',
  useNewUrlParser: true
})
.catch(err => console.log(err));

mongoose.connection.on('error', ()=>{
  console.log(error)
});