const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../assets')));

app.post('/login', (req, res) => {
  res.json({dollarBalance: 52900, bitcoinBalance: 4.5})
})

app.post('/signup', (req, res) => {
  res.json({dollarBalance: 100000, bitcoinBalance: 0})
})

app.listen(3000, () => console.log('server is running on 3000'))