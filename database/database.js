const mongoose = require('mongoose');
const dbConnection = process.env.DATABASE_URI;

mongoose.connect(dbConnection, {
  dbName: 'CrypTick'
})

mongoose.connection.on('error', ()=>{
  console.log(error)
});