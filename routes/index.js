const express = require('express');

const router = express.Router();
const botController = require('../controllers/bot');
const session = require('../controllers/session');

function routes() {
  router.post('/bot/init', botController.createBot);
  router.post('/isAuthorized', session.isAuthorized);

  return router;
}

module.exports = routes;
