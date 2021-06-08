const express = require('express');

const router = express.Router();
const botController = require('../controllers/bot');
const session = require('../controllers/session');

function routes() {
  router.get('/bot/init', botController.createBot);
  router.post('/bot/save', botController.saveBot);
  router.post('/isAuthorized', session.isAuthorized);

  return router;
}

module.exports = routes;
