const express = require('express');
const app = express();
const localRouter = require('./localRouter')

const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../assets')));

app.use('/', localRouter)

module.exports = app;
