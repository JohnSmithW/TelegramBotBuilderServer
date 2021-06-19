const express = require('express');
const passport = require('passport');

const router = express.Router();
const botController = require('../controllers/bot');
const session = require('../controllers/session');
const userController = require('../controllers/user');
const { isUserRegistered } = require('../middlewares/user');
const { success, fail } = require('../repositories/passport');

function routes() {
  router.post('/bot/init', botController.initializeBot);
  router.post('/bot/save', botController.saveBot);
  router.post('/isAuthorized', session.isAuthorized);
  router.post('/signUp', isUserRegistered, userController.signUp);
  router.post('/signIn', isUserRegistered, userController.signIn);

  router.get(
    '/google',
    passport.authenticate('google', { scope: ['profile', 'email', 'openid'] }),
    success,
  );

  router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/authorization' }),
    fail,
  );

  return router;
}

module.exports = routes;
