const express = require('express');
const app = express();

app.get('/api', (req, res) => {
  console.log('heyyyy');
  res.json({text:'text from server'});
})

app.listen(3000, () => console.log('server is running on 3000'));