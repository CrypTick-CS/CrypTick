const express = require('express');
const app = express();
const localRouter = require('./localRouter');
const path = require('path');
const dbConnection = require('../database/database');
const authController = require('../controllers/authController');


dbConnection();

// app.use() === SET UP AUTH ROUTHER HERE TO VERIFY AND USE SESSIONS

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, '../assets')));

app.use('/', localRouter)

module.exports = app;
