const express = require('express');




const PORT = process.env.PORT || 8080;
const dev = process.env.NODE_ENV !== 'production';
const app = express({dev});

const server = require('http').Server(app);



const showRoutes = require('./routes/index.js');

app.use('/api', showRoutes(app));



server.listen(PORT, err => {
  if (err) throw err;
  console.log(`> Ready on port ${PORT}`);
});