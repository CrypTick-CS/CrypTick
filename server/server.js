const express = require('express');
const app = express();
const path = require('path');

app.use(express.static(path.join(__dirname, '../assets')));

app.listen(3000, () => console.log('server is running on 3000'))