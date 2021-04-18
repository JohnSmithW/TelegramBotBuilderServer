const express = require('express');

const router = express.Router();
const botController = require('../controllers/bot');

function routes() {
  router.post('/bot/create', botController.createBot);
  router.get('/', (req,res)=>{
     res.send('hey')
  })

  return router;
}

module.exports = routes;
